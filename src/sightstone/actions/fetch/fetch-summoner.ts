/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import async from 'async';
import util from 'util';
import Action from '../action';
import SummonerInterface from '../../interfaces/summoner';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchSummonerByName extends Action {
    private server: string;

    private username: string;

    private endIndex: number | undefined = undefined;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: string, username: string, endIndex?: number) {
        super(SubmoduleMap);
        this.server = server;
        this.username = username;
        this.endIndex = endIndex;
    }

    public async run(): Promise<SummonerInterface> {
        try {
            // Region check
            if (!(<any>Object).values(Region).includes(this.server.toLowerCase())) {
                throw new Error('Invalid server region provided.');
            }

            // TODO: Fix the typing of summonerData (maybe through another interface?)
            await this.waitForRateLimit();
            await this.incrementRateLimit();
            const { data: summonerData }: any = await this.RiotAPI.request(ENDPOINTS.SUMMONER.SUMMONER_NAME, { server: this.server, 'summoner-name': this.username }).get();

            const otherData: any = await util.promisify(async.parallel)({
                league: async () => {
                    await this.waitForRateLimit();
                    await this.incrementRateLimit();
                    const { data: matchData }: any = await this.RiotAPI.request(ENDPOINTS.LEAGUE.SUMMONER_ID, { server: this.server, 'summoner-id': summonerData.id }).get();
                    return matchData;
                },
                mastery: async () => {
                    await this.waitForRateLimit();
                    await this.incrementRateLimit();
                    const { data: masteryData }: any = await this.RiotAPI.request(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST, { server: this.server, 'summoner-id': summonerData.id }).get();
                    return masteryData;
                },
                matchlist: async () => {
                    await this.waitForRateLimit();
                    await this.incrementRateLimit();
                    if (typeof this.endIndex === 'number') {
                        const { data: matchlistData }: any = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID_INDEX, { server: this.server, 'account-id': summonerData.accountId, 'end-index': this.endIndex }).get();
                        return matchlistData;
                    } else {
                        const { data: matchlistData }: any = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID, { server: this.server, 'account-id': summonerData.accountId }).get();
                        return matchlistData;
                    }
                },
            });
            summonerData.server = this.server;

            return { summoner: summonerData, ...otherData } as SummonerInterface;
        } catch (e) {
            if (e.response?.status) {
                console.error(`[sightstone]: Summoner data fetch failed with status code ${e.response.status}`);
                if (e.response.status === 403) {
                    throw new Error(`
                        [sightstone]: The provided Riot API key is invalid
                        or has expired. Please verify its authenticity. (sc-403)
                    `);
                }
            } else {
                console.error(`[sightstone]: Match data fetch failed with error ${e.name || ''}.`);
            }

            throw e;
        }
    }
}

export default FetchSummonerByName;

/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import async from 'async';
import Bluebird from 'bluebird';
import Action from '../action';
import SummonerInterface from '../../interfaces/summoner';
import { ENDPOINTS } from '../../../riot-api';
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
            // TODO: Fix the typing of summonerData (maybe through another interface?)
            await this.waitForRateLimit();
            await this.incrementRateLimit();
            const summonerData: any = await this.RiotAPI.request(ENDPOINTS.SUMMONER.SUMMONER_NAME, { server: this.server, 'summoner-name': this.username }).get();

            const otherData = await Bluebird.promisify(async.series)({
                league: async (callback: Function) => {
                    await this.waitForRateLimit();
                    await this.incrementRateLimit();
                    const matchData = await this.RiotAPI.request(ENDPOINTS.LEAGUE.SUMMONER_ID, { server: this.server, 'summoner-id': summonerData.id }).get();
                    return callback(null, matchData);
                },
                mastery: async (callback: Function) => {
                    await this.waitForRateLimit();
                    await this.incrementRateLimit();
                    const masteryData = await this.RiotAPI.request(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST, { server: this.server, 'summoner-id': summonerData.id }).get();
                    return callback(null, masteryData);
                },
                matchlist: async (callback: Function) => {
                    let matchlistData;
                    await this.waitForRateLimit();
                    await this.incrementRateLimit();
                    if (typeof this.endIndex === 'number') {
                        matchlistData = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID_INDEX, { server: this.server, 'account-id': summonerData.accountId, 'end-index': this.endIndex }).get();
                    } else {
                        matchlistData = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID, { server: this.server, 'account-id': summonerData.accountId }).get();
                    }

                    return callback(null, matchlistData);
                },
            });

            // Add custom properties to objects returned in previous API calls
            summonerData.server = this.server; // Set the server as a property of summonerData for future reference.

            return { summoner: summonerData, ...otherData } as SummonerInterface;
        } catch (e) {
            if (e.name === 'StatusCodeError') {
                console.error(`[sightstone]: Summoner data fetch failed with status code ${e.statusCode}`);
                if (e.statusCode === 403) {
                    throw new Error(`
                        [sightstone]: The provided Riot API key is invalid
                        or has expired. Please verify its authenticity. (sc-403)
                    `);
                }
            } else {
                console.error(`[sightstone]: Summoner data fetch failed with error ${e.name}`);
            }
            throw e;
        }
    }
}

export default FetchSummonerByName;

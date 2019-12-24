/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import async from 'async';
import Bluebird from 'bluebird';
import Action from '../action';
import SummonerInterface from '../../interfaces/summoner';
import RiotAPIModule, { ENDPOINTS } from '../../../riot-api';
import DatabaseInternal from '../../databases/database';

class FetchSummonerByName extends Action {
    private server: string;

    private username: string;

    private endIndex: number | undefined = undefined;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, server: string, username: string, endIndex?: number) {
        super(RiotAPI, database);
        this.server = server;
        this.username = username;
        this.endIndex = endIndex;
    }

    public async run(): Promise<SummonerInterface> {
        try {
            // TODO: Fix the typing of summonerData (maybe through another interface?)
            const summonerData: any = await this.RiotAPI.request(ENDPOINTS.SUMMONER.SUMMONER_NAME, { server: this.server, 'summoner-name': this.username }).get();

            const otherData = await Bluebird.promisify(async.parallel)({
                league: async (callback: Function) => {
                    const matchData = await this.RiotAPI.request(ENDPOINTS.LEAGUE.SUMMONER_ID, { server: this.server, 'summoner-id': summonerData.id }).get();
                    return callback(null, matchData);
                },
                mastery: async (callback: Function) => {
                    const masteryData = await this.RiotAPI.request(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST, { server: this.server, 'summoner-id': summonerData.id }).get();
                    return callback(null, masteryData);
                },
                matchlist: async (callback: Function) => {
                    let matchlistData;
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
                console.error(`Summoner data fetch failed with status code ${e.statusCode}`);
                if (e.statusCode === 403) console.error('Maybe your Riot API key is invalid?');
            } else {
                console.error(`Summoner data fetch failed with error ${e.name}`);
            }
            throw e;
        }
    }
}

export default FetchSummonerByName;

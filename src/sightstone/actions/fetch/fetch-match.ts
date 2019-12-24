/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import ENDPOINTS from '../../../riot-api/enums/endpoints';
import MatchInterface from '../../interfaces/match';
import RiotAPIModule from '../../../riot-api';
import DatabaseInternal from '../../databases/database';

class FetchMatchByID extends Action {
    private server: string;

    private matchId: number;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, server: string, matchId: number) {
        super(RiotAPI, database);
        this.server = server;
        this.matchId = matchId;
    }

    public async run(): Promise<MatchInterface> {
        try {
            const matchData: object = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCH.MATCH_ID, { server: this.server, 'match-id': this.matchId }).get();
            const timelineData: object = await this.RiotAPI.request(ENDPOINTS.MATCH.TIMELINE.MATCH_ID, { server: this.server, 'match-id': this.matchId }).get();
            return { ...matchData, timeline: timelineData } as MatchInterface;
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

export default FetchMatchByID;

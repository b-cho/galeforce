/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from "./action";
import ENDPOINTS from "../../riot-api/enums/endpoints";
import MatchInterface from "../interfaces/match";
import {default as RiotAPIModule} from "../../riot-api";
import DatabaseInternal from "../databases/database";

class FetchMatchByID extends Action {
    private server: string;
    private matchId: number;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, server: string, matchId: number) {
        super(RiotAPI, database);
        this.server = server;
        this.matchId = matchId;
    }

    public async run(): Promise<MatchInterface> {
        let matchData: any = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCH.MATCH_ID, {server: this.server, 'match-id': this.matchId}).get();
        let timelineData: any = await this.RiotAPI.request(ENDPOINTS.MATCH.TIMELINE.MATCH_ID, {server: this.server, 'match-id': this.matchId}).get();
        return {...matchData, timeline: timelineData};
    }
}

export default FetchMatchByID;
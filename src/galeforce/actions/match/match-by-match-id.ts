/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchByMatchID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.MATCH.MATCH.MATCH_ID);
    }

    public matchId(matchId: number): this { 
        this.payload.setMatchId(matchId);
        return this;
    }

    public tournamentCode(tournamentCode: string): this {
        this.payload.setEndpoint(ENDPOINTS.MATCH.MATCH.MATCH_ID_TOURNAMENT);
        this.payload.setTournamentCode(tournamentCode);
        return this;
    }

    public async exec(): Promise<MatchInterface> {
        return this.run<MatchInterface>();
    }
}

export default FetchMatchByMatchID;

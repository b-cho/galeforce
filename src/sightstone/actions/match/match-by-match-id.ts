/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchByMatchID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, region: Region, matchId: number) {
        super(SubmoduleMap, region);

        this.matchId = matchId;
    }

    public async exec(): Promise<MatchInterface> {
        return this.run<MatchInterface>(ENDPOINTS.MATCH.MATCH.MATCH_ID, { server: this.region, 'match-id': this.matchId });
    }
}

export default FetchMatchByMatchID;

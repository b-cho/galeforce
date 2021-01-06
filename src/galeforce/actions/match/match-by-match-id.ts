/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchByMatchID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap, ENDPOINTS.MATCH.MATCH.MATCH_ID);

    }

    public region: (region: Region) => this = super.region;

    public matchId: (matchId: number) => this = super.matchId;

    public async exec(): Promise<MatchInterface> {
        return this.run<MatchInterface>();
    }
}

export default FetchMatchByMatchID;

/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchlistByAccountID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID;
    }

    public region: (region: Region) => this = super.region;

    public accountId: (accountId: string) => this = super.accountId;

    public async exec(): Promise<MatchlistInterface> {
        return this.run<MatchlistInterface>();
    }
}

export default FetchMatchlistByAccountID;

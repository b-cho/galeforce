/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchlistByAccountID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID);
    }

    public accountId(accountId: string): this {
        this.payload.setAccountId(accountId);
        return this;
    }
    
    public query(query: { [key: string]: unknown }): this {
        this.payload.setQuery(query);
        return this;
    }

    public async exec(): Promise<MatchlistInterface> {
        return this.run<MatchlistInterface>();
    }
}

export default FetchMatchlistByAccountID;

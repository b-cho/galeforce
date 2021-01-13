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
        this.setEndpoint(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID);
    }

    public accountId: (accountId: string) => this = super.setAccountId;
    
    public query: (query: { [key: string]: unknown }) => this = super.setQuery;

    public async exec(): Promise<MatchlistInterface> {
        return this.run<MatchlistInterface>();
    }
}

export default FetchMatchlistByAccountID;

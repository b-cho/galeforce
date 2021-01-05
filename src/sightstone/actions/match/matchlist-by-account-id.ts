/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchlistByAccountID extends Action {
    private endIndex: number | undefined;

    constructor(SubmoduleMap: SubmoduleMapInterface, region: Region, accountId: string) {
        super(SubmoduleMap, region);

        this.accountId = accountId;
    }

    public async exec(): Promise<MatchlistInterface> {
        return this.run<MatchlistInterface>(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID, { server: this.region, 'account-id': this.accountId });
    }
}

export default FetchMatchlistByAccountID;
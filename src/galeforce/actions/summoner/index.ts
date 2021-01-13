/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { SummonerInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchSummoner extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
    }

    public name(name: string): this {
        this.payload.setEndpoint(ENDPOINTS.SUMMONER.SUMMONER_NAME); // set action endpoint simultaneously
        this.payload.setName(name);
        return this;
    };

    public puuid(puuid: string): this {
        this.payload.setEndpoint(ENDPOINTS.SUMMONER.PUUID); // set action endpoint simultaneously
        this.payload.setPuuid(puuid);
        return this;
    };

    public accountId(accountId: string): this {
        this.payload.setEndpoint(ENDPOINTS.SUMMONER.ACCOUNT_ID); // set action endpoint simultaneously
        this.payload.setAccountId(accountId);
        return this;
    };

    public summonerId(summonerId: string): this {
        this.payload.setEndpoint(ENDPOINTS.SUMMONER.SUMMONER_ID); // set action endpoint simultaneously
        this.payload.setSummonerId(summonerId);
        return this;
    }

    public async exec(): Promise<SummonerInterface> {
        return this.run<SummonerInterface>();
    }
}

export default FetchSummoner;

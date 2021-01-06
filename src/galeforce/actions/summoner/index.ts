/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { SummonerInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchSummoner extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
    }

    public region: (region: Region) => this = super.region;

    public name(name: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_NAME; // set action endpoint simultaneously
        return super.name(name);
    };

    public puuid(puuid: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.PUUID; // set action endpoint simultaneously
        return super.puuid(puuid);
    };

    public accountId(accountId: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.ACCOUNT_ID; // set action endpoint simultaneously
        return super.accountId(accountId);
    };

    public summonerId(summonerId: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_ID; // set action endpoint simultaneously
        return super.summonerId(summonerId);
    };

    public async exec(): Promise<SummonerInterface> {
        return this.run<SummonerInterface>();
    }
}

export default FetchSummoner;

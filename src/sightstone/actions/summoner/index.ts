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
        super.name(name);
        this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_NAME; // set action endpoint simultaneously
        return this;
    };

    public puuid(puuid: string): this {
        super.puuid(puuid);
        this.payload.endpoint = ENDPOINTS.SUMMONER.PUUID; // set action endpoint simultaneously
        return this;
    };

    public accountId(accountId: string): this {
        super.accountId(accountId);
        this.payload.endpoint = ENDPOINTS.SUMMONER.ACCOUNT_ID; // set action endpoint simultaneously
        return this;
    };

    public summonerId(summonerId: string): this {
        super.summonerId(summonerId);
        this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_ID; // set action endpoint simultaneously
        return this;
    };

    public async exec(): Promise<SummonerInterface> {
        if (typeof this.payload.summonerName === undefined) {
            throw new Error('[sightstone]: Action payload summoner name is undefined.');
        }
        return this.run<SummonerInterface>();
    }
}

export default FetchSummoner;

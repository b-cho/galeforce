import Action from '../action';
import { SummonerInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetSummoner extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
    }

    public name(summonerName: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_NAME; // set action endpoint simultaneously
        this.payload.summonerName = summonerName;
        return this;
    }

    public puuid(puuid: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.PUUID; // set action endpoint simultaneously
        this.payload.puuid = puuid;
        return this;
    }

    public accountId(accountId: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.ACCOUNT_ID; // set action endpoint simultaneously
        this.payload.accountId = accountId;
        return this;
    }

    public summonerId(summonerId: string): this {
        this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_ID; // set action endpoint simultaneously
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<SummonerInterface> {
        return this.run<SummonerInterface>();
    }
}

export default GetSummoner;

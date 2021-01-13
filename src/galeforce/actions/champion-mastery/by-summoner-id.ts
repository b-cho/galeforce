import Action, { Payload } from '../action';
import { ChampionMasteryInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMasteryBySummonerID<R = ChampionMasteryInterface[]> extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, payload?: Payload) {
        super(SubmoduleMap, payload);
        if(!this.payload.endpoint) this.setEndpoint(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST);
    }

    public summonerId: (summonerId: string) => this = super.setSummonerId;

    public championId(championId: number): FetchMasteryBySummonerID<ChampionMasteryInterface> {
        this.setEndpoint(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.CHAMPION);
        this.setChampionId(championId);
        return new FetchMasteryBySummonerID<ChampionMasteryInterface>(this.SubmoduleMap, this.payload);
    }

    public async exec(): Promise<R> {
        return this.run<R>();
    }
}

export default FetchMasteryBySummonerID;

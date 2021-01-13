import Action from '../action';
import { Payload } from '../payload';
import { ChampionMasteryInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetMasteryBySummoner<R = ChampionMasteryInterface[]> extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, payload?: Payload) {
        super(SubmoduleMap, payload);
        if(!this.payload.payload.endpoint) {
            this.payload.setEndpoint(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST);
        }
    }

    public summonerId(summonerId: string): this {
        this.payload.setSummonerId(summonerId);
        return this;
    }

    public championId(championId: number): GetMasteryBySummoner<ChampionMasteryInterface> {
        this.payload.setEndpoint(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.CHAMPION);
        this.payload.setChampionId(championId);
        return new GetMasteryBySummoner<ChampionMasteryInterface>(this.SubmoduleMap, this.payload.payload);
    }

    public async exec(): Promise<R> {
        return this.run<R>();
    }
}

export default GetMasteryBySummoner;

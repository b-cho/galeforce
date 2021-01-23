import Action from '../action';
import { Payload } from '../payload';
import { ChampionMasteryInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetMasteryBySummoner<R = ChampionMasteryInterface[]> extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, payload?: Payload) {
        super(SubmoduleMap, payload);
        if (!this.payload.endpoint) {
            this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST;
        }
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public championId(championId: number): GetMasteryBySummoner<ChampionMasteryInterface> {
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.CHAMPION;
        this.payload.championId = championId;
        return new GetMasteryBySummoner<ChampionMasteryInterface>(this.SubmoduleMap, this.payload);
    }

    public async exec(): Promise<R> {
        return this.run<R>();
    }
}

export default GetMasteryBySummoner;

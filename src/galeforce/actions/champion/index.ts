import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { ChampionInfoInterface } from '../../interfaces/dto';

class GetChampionRotations extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION.CHAMPION_ROTATIONS;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public async exec(): Promise<ChampionInfoInterface> {
        return this.run<ChampionInfoInterface>();
    }
}

export default GetChampionRotations;

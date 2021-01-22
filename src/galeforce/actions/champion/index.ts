import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { ChampionInfoInterface } from '../../interfaces/dto';

class GetChampionRotations extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION.CHAMPION_ROTATIONS;
    }

    public async exec(): Promise<ChampionInfoInterface> {
        return this.run<ChampionInfoInterface>();
    }
}

export default GetChampionRotations;

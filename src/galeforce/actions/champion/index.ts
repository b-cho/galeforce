import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { ChampionInfoInterface } from '../../interfaces/dto';

class FetchChampionRotations extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.CHAMPION.CHAMPION_ROTATIONS);
    }

    public async exec(): Promise<ChampionInfoInterface> {
        return this.run<ChampionInfoInterface>();
    }
}

export default FetchChampionRotations;

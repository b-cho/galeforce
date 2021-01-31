import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { ChampionInfoDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as LeagueRegion, Action);

export default class GetChampionRotations extends BaseAction<ChampionInfoDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHAMPION.CHAMPION_ROTATIONS;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

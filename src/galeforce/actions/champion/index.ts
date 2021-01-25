import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { ChampionInfoInterface } from '../../interfaces/dto';
import { TakesRegion } from '../mixins';

const BaseAction = TakesRegion<LeagueRegion>(Action);

export class GetChampionRotations extends BaseAction<ChampionInfoInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION.CHAMPION_ROTATIONS;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

import { Action } from '../action';
import { PlayerInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesSummonerId, TakesRegion } from '../mixins';

const BaseAction =
TakesSummonerId(
    TakesRegion<LeagueRegion>(
        Action));

export class GetClashPlayers extends BaseAction<PlayerInterface[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.PLAYERS;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

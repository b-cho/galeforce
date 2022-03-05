import Action from '../../action';
import { PlayerDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSummonerId, TakesRegion } from '../../mixins';

const BaseAction = TakesSummonerId(
    TakesRegion(
        {} as LeagueRegion,
        Action,
    ),
);

export default class GetClashPlayers extends BaseAction<PlayerDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CLASH.PLAYERS;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

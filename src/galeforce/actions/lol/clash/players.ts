import Action from '../../action';
import { PlayerDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
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

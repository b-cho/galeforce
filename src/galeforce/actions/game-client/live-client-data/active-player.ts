import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LiveClientActivePlayerDTO } from '../../../interfaces/dto';

export default class GetLiveClientActivePlayer extends Action<LiveClientActivePlayerDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.ACTIVE_PLAYER;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

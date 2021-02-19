import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LiveClientPlayerDTO } from '../../../interfaces/dto';

export default class GetLiveClientPlayerList extends Action<LiveClientPlayerDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.PLAYER_LIST;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

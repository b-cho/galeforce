import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';

export default class GetLiveClientActivePlayerName extends Action<string> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.ACTIVE_PLAYER_NAME;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

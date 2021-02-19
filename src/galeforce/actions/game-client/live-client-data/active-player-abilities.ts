import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LiveClientAbilitiesDTO } from '../../../interfaces/dto';

export default class GetLiveClientActivePlayerAbilities extends Action<LiveClientAbilitiesDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.ACTIVE_PLAYER_ABILITIES;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

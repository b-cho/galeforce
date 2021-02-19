import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LiveClientFullRunesDTO } from '../../../interfaces/dto';

export default class GetLiveClientActivePlayerRunes extends Action<LiveClientFullRunesDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.ACTIVE_PLAYER_RUNES;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

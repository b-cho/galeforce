import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LiveClientAllGameDataDTO } from '../../../interfaces/dto';

export default class GetLiveClientAllGameData extends Action<LiveClientAllGameDataDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.ALL_GAME_DATA;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

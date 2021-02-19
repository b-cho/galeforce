import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LiveClientGameStatsDTO } from '../../../interfaces/dto';

export default class GetLiveClientGameStats extends Action<LiveClientGameStatsDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.GAME_STATS;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

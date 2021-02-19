import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LiveClientEventsDTO } from '../../../interfaces/dto';

export default class GetLiveClientEvents extends Action<LiveClientEventsDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.EVENTS;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

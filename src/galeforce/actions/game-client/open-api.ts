import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';

export default class GetGameClientOpenAPI extends Action<object> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.OPEN_API;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

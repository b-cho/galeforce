import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';

export default class GetDataDragonLanguages extends Action<string[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.DATA_DRAGON.LANGUAGES;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

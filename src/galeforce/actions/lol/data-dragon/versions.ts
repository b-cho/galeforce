import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';

export default class GetDataDragonVersions extends Action<string[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.VERSIONS;
        this.payload.type = 'lol-ddragon';
        this.payload.method = 'GET';
    }
}

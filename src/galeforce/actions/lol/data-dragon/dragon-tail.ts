import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesVersion } from '../../mixins';

const BaseAction = TakesVersion(Action);

export default class GetDataDragonTail extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'ddragon-buffer';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        if (this.payload.version === '10.10.5') {
            this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.DRAGON_TAIL_ZIP;
        } else {
            this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.DRAGON_TAIL;
        }
    }
}

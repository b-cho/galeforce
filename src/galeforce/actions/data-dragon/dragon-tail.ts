import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { TakesVersion } from '../mixins';

const BaseAction = TakesVersion(Action);

export default class GetDataDragonTail extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'ddragon-buffer';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<Buffer> {
        if (this.payload.version === '10.10.5') {
            this.payload.endpoint = ENDPOINTS.DATA_DRAGON.DRAGON_TAIL_ZIP;
        } else {
            this.payload.endpoint = ENDPOINTS.DATA_DRAGON.DRAGON_TAIL;
        }
        return super.exec();
    }
}

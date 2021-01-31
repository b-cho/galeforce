import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { TakesVersion } from '../mixins';

const BaseAction = TakesVersion(Action);

export default class GetDataDragonTail extends BaseAction<string> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<string> {
        if (this.payload.version === '10.10.5') {
            this.payload.endpoint = ENDPOINTS.DATA_DRAGON.DRAGON_TAIL_ZIP;
        } else {
            this.payload.endpoint = ENDPOINTS.DATA_DRAGON.DRAGON_TAIL;
        }
        return super.exec();
    }
}

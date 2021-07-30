import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesLocale, TakesVersion } from '../../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        Action,
    ),
);

export default class GetLorDataDragonCoreBundle extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lor-ddragon-buffer';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.CORE_BUNDLE;
    }
}

import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesLocale, TakesVersion } from '../../mixins';
import { LorDataDragonGlobalsDTO } from '../../../interfaces/dto';

const BaseAction = TakesVersion(
    TakesLocale(
        Action,
    ),
);

export default class GetLorDataDragonCoreGlobals extends BaseAction<LorDataDragonGlobalsDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lor-ddragon';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.CORE_GLOBALS;
    }
}

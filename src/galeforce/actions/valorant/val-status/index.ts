import Action from '../../action';
import { ENDPOINTS, ValorantRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { PlatformDataDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as ValorantRegion, Action);

export default class GetValorantPlatformData extends BaseAction<PlatformDataDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.VAL_STATUS.PLATFORM_DATA;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

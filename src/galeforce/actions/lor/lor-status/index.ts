import Action from '../../action';
import { ENDPOINTS, LorRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { PlatformDataDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as LorRegion, Action);

export default class GetLorPlatformData extends BaseAction<PlatformDataDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOR_STATUS.PLATFORM_DATA;
        this.payload.type = 'lor';
        this.payload.method = 'GET';
    }
}

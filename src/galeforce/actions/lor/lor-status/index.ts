import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { PlatformDataDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as RiotRegion, Action);

export default class GetLorPlatformData extends BaseAction<PlatformDataDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOR_STATUS.PLATFORM_DATA;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

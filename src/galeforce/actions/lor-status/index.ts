import { Action } from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { PlatformDataInterface } from '../../interfaces/dto';
import { TakesRegion } from '../mixins';

const BaseAction = TakesRegion<RiotRegion>(Action);

export class GetLorPlatformData extends BaseAction<PlatformDataInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LOR_STATUS.PLATFORM_DATA;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

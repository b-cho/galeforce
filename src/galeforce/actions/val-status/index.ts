import { Action } from '../action';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { PlatformDataInterface } from '../../interfaces/dto';
import { TakesRegion } from '../mixins';

const BaseAction = TakesRegion<ValorantRegion>(Action);

export class GetValorantPlatformData extends BaseAction<PlatformDataInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_STATUS.PLATFORM_DATA;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}
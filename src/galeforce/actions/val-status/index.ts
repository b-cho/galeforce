import Action from '../action';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { PlatformDataInterface } from '../../interfaces/dto';

class GetValorantPlatformData extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_STATUS.PLATFORM_DATA;
        this.payload.type = 'val';
    }

    public region: (region: ValorantRegion) => this = super.region;

    public async exec(): Promise<PlatformDataInterface> {
        return this.run<PlatformDataInterface>();
    }
}

export default GetValorantPlatformData;

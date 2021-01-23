import Action from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { PlatformDataInterface } from '../../interfaces/dto';

class GetLorPlatformData extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LOR_STATUS.PLATFORM_DATA;
        this.payload.type = 'riot';
    }

    public region: (region: RiotRegion) => this = super.region;

    public async exec(): Promise<PlatformDataInterface> {
        return this.run<PlatformDataInterface>();
    }
}

export default GetLorPlatformData;

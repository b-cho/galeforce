import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { PlatformDataInterface } from '../../interfaces/dto';

class GetLeaguePlatformData extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.STATUS.PLATFORM_DATA);
    }

    public async exec(): Promise<PlatformDataInterface> {
        return this.run<PlatformDataInterface>();
    }
}

export default GetLeaguePlatformData;

import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { PlatformDataInterface } from '../../interfaces/dto';

class GetLeaguePlatformData extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.STATUS.PLATFORM_DATA;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public async exec(): Promise<PlatformDataInterface> {
        return this.run<PlatformDataInterface>();
    }
}

export default GetLeaguePlatformData;

import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { PlatformDataDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as LeagueRegion, Action);

export default class GetLeaguePlatformData extends BaseAction<PlatformDataDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.STATUS.PLATFORM_DATA;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

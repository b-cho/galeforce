import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { PlatformDataInterface } from '../../interfaces/dto';
import { TakesRegion } from '../mixins';

const BaseAction = TakesRegion({} as LeagueRegion, Action);

export class GetLeaguePlatformData extends BaseAction<PlatformDataInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.STATUS.PLATFORM_DATA;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

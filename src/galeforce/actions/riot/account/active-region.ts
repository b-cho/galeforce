import Action from '../../action';
import { AccountRegionDTO } from '../../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRegionGame, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRegionGame(
        TakesRegion(
            {} as RiotRegion,
            Action,
        ),
    ),
);

export default class GetActiveRegion extends BaseAction<AccountRegionDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.ACCOUNT.ACTIVE_REGION;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

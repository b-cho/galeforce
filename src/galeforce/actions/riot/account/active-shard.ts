import Action from '../../action';
import { ActiveShardDTO } from '../../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesGame, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesGame(
        TakesRegion({} as RiotRegion,
            Action),
    ),
);

export default class GetActiveShard extends BaseAction<ActiveShardDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.ACCOUNT.ACTIVE_SHARDS;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

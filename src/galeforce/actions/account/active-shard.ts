import { Action } from '../action';
import { ActiveShardInterface } from '../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesPUUID, TakesGame, TakesRegion } from '../mixins';

const BaseAction = TakesPUUID(
    TakesGame(
        TakesRegion<RiotRegion>(
            Action,
        ),
    ),
);

export class GetActiveShard extends BaseAction<ActiveShardInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.ACCOUNT.ACTIVE_SHARDS;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

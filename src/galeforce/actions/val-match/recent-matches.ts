import { Action } from '../action';
import { ValRecentMatchesInterface } from '../../interfaces/dto';
import { ENDPOINTS, ValorantQueue, ValorantRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesQueue, TakesRegion } from '../mixins';

const BaseAction = TakesQueue<ValorantQueue>(
    TakesRegion<ValorantRegion>(
        Action,
    ),
);

export class GetValorantRecentMatches extends BaseAction<ValRecentMatchesInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.RECENT;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

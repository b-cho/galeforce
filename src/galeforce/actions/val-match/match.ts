import { Action } from '../action';
import { ValMatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../mixins';

const BaseAction = TakesMatchId(
    TakesRegion<ValorantRegion>(
        Action,
    ),
);

export class GetValorantMatch extends BaseAction<ValMatchInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.MATCH;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

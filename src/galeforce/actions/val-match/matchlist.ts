import { Action } from '../action';
import { ValMatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../mixins';

const BaseAction = TakesPUUID(
    TakesRegion({} as ValorantRegion,
        Action),
);

export class GetValorantMatchlist extends BaseAction<ValMatchlistInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.MATCHLIST;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

import { Action } from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../mixins';

const BaseAction = TakesPUUID(
    TakesRegion<RiotRegion>(
        Action,
    ),
);

export class GetLorMatchlist extends BaseAction<string[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LOR_MATCH.MATCHLIST;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

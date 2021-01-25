import { Action } from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesPUUID, TakesQuery, TakesRegion } from '../mixins';

type GetTFTMatchlistQuery = {
    count?: number;
}

const BaseAction = TakesPUUID(
    TakesQuery<GetTFTMatchlistQuery>(
        TakesRegion<RiotRegion>(
            Action,
        ),
    ),
);

export class GetTFTMatchlist extends BaseAction<string[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TFT_MATCH.MATCHLIST;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesQuery, TakesRegion } from '../../mixins';

type GetTFTMatchlistQuery = {
    count?: number;
}

const BaseAction = TakesPUUID(
    TakesQuery({} as GetTFTMatchlistQuery,
        TakesRegion({} as RiotRegion,
            Action)),
);

export default class GetTFTMatchlist extends BaseAction<string[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TFT_MATCH.MATCHLIST;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

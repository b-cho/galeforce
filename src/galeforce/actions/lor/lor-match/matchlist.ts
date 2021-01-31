import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRegion({} as RiotRegion,
        Action),
);

export default class GetLorMatchlist extends BaseAction<string[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOR_MATCH.MATCHLIST;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

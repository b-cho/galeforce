import Action from '../../action';
import { TFTMatchDTO } from '../../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../../mixins';

const BaseAction = TakesMatchId(
    TakesRegion({} as RiotRegion,
        Action),
);

export default class GetTFTMatch extends BaseAction<TFTMatchDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TFT_MATCH.MATCH;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

import { Action } from '../action';
import { TFTMatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../mixins';

const BaseAction = TakesMatchId(
    TakesRegion<RiotRegion>(
        Action));

export class GetTFTMatch extends BaseAction<TFTMatchInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TFT_MATCH.MATCH;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

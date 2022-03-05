import Action from '../../action';
import { LorMatchDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LorRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../../mixins';

const BaseAction = TakesMatchId(
    TakesRegion(
        {} as LorRegion,
        Action,
    ),
);

export default class GetLorMatch extends BaseAction<LorMatchDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOR_MATCH.MATCH;
        this.payload.type = 'lor';
        this.payload.method = 'GET';
    }
}

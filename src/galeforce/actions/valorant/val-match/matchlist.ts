import Action from '../../action';
import { ValMatchlistDTO } from '../../../interfaces/dto';
import { ENDPOINTS, ValorantRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRegion({} as ValorantRegion,
        Action),
);

export default class GetValorantMatchlist extends BaseAction<ValMatchlistDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.MATCHLIST;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

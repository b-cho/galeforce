import Action from '../../action';
import { ValRecentMatchesDTO } from '../../../interfaces/dto';
import { ENDPOINTS, ValorantQueue, ValorantRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesQueue, TakesRegion } from '../../mixins';

const BaseAction = TakesQueue(
    {} as ValorantQueue,
    TakesRegion(
        {} as ValorantRegion,
        Action,
    ),
);

export default class GetValorantRecentMatches extends BaseAction<ValRecentMatchesDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.RECENT;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ValMatchDTO } from '../../../interfaces/dto';
import { ENDPOINTS, ValorantRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../../mixins';

const BaseAction = TakesMatchId(
    TakesRegion(
        {} as ValorantRegion,
        Action,
    ),
);

export default class GetValorantMatch extends BaseAction<ValMatchDTO> {
    constructor(submodules: SubmoduleMap, console: boolean) {
        super(submodules);
        this.payload.endpoint = console ? ENDPOINTS.VAL_CONSOLE_MATCH.MATCH : ENDPOINTS.VAL_MATCH.MATCH;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

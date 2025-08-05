import Action from '../../action';
import { ValMatchlistDTO } from '../../../interfaces/dto';
import { ENDPOINTS, ValorantRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRegion(
        {} as ValorantRegion,
        Action,
    ),
);

export default class GetValorantMatchlist extends BaseAction<ValMatchlistDTO> {
    constructor(submodules: SubmoduleMap, console: boolean) {
        super(submodules);
        this.payload.endpoint = console ? ENDPOINTS.VAL_CONSOLE_MATCH.MATCHLIST : ENDPOINTS.VAL_MATCH.MATCHLIST;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

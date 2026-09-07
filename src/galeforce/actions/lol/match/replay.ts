import Action from '../../action';
import { ReplayDTO } from '../../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRegion(
        {} as RiotRegion,
        Action,
    ),
);

export default class GetReplay extends BaseAction<ReplayDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.MATCH.REPLAY;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

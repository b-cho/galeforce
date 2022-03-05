import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { LobbyEventDTOWrapper } from '../../../interfaces/dto';
import { TakesTournamentCode, TakesRegion } from '../../mixins';

const BaseAction = TakesTournamentCode(
    TakesRegion(
        {} as RiotRegion,
        Action,
    ),
);

export default class GetLobbyEvents extends BaseAction<LobbyEventDTOWrapper> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.EVENTS;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

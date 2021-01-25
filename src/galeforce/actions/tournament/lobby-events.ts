import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { LobbyEventInterfaceWrapper } from '../../interfaces/dto';
import { TakesTournamentCode, TakesRegion } from '../mixins';

const BaseAction = TakesTournamentCode(
    TakesRegion({} as LeagueRegion,
        Action),
);

export class GetLobbyEvents extends BaseAction<LobbyEventInterfaceWrapper> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.EVENTS;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

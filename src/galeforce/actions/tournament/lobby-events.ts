import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { LobbyEventInterfaceWrapper } from '../../interfaces/dto';

class GetLobbyEvents extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.TOURNAMENT.EVENTS);
    }

    public tournamentCode(tournamentCode: string): this {
        this.payload.setTournamentCode(tournamentCode);
        return this;
    }

    public async exec(): Promise<LobbyEventInterfaceWrapper> {
        return this.run<LobbyEventInterfaceWrapper>();
    }
}

export default GetLobbyEvents;

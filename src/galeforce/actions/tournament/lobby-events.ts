import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { LobbyEventInterfaceWrapper } from '../../interfaces/dto';

class GetLobbyEvents extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.EVENTS;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public tournamentCode(tournamentCode: string): this {
        this.payload.tournamentCode = tournamentCode;
        return this;
    }

    public async exec(): Promise<LobbyEventInterfaceWrapper> {
        return this.run<LobbyEventInterfaceWrapper>();
    }
}

export default GetLobbyEvents;

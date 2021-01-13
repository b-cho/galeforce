import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentInterface } from '../../interfaces/dto';

class FetchAllClashTournaments extends Action {
    public async exec(): Promise<TournamentInterface[]> {
        return this.run<TournamentInterface[]>();
    }
}

class FetchClashTournament extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
    }

    public all(): FetchAllClashTournaments {
        this.payload.setEndpoint(ENDPOINTS.CLASH.TOURNAMENTS.ALL);
        return new FetchAllClashTournaments(this.SubmoduleMap, this.payload.payload);
    };

    public teamId(teamId: string): this {
        this.payload.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TEAM;
        this.payload.setTeamId(teamId);
        return this;
    }

    public tournamentId(tournamentId: number): this {
        this.payload.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TOURNAMENT;
        this.payload.setTournamentId(tournamentId);
        return this;
    }


    public async exec(): Promise<TournamentInterface> {
        return this.run<TournamentInterface>();
    }
}

export default FetchClashTournament;

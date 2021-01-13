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
        this.setEndpoint(ENDPOINTS.CLASH.TOURNAMENTS.ALL);
        return new FetchAllClashTournaments(this.SubmoduleMap, this.payload);
    };

    public teamId(teamId: string): this {
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TEAM;
        return super.setTeamId(teamId);
    }

    public tournamentId(tournamentId: number): this {
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TOURNAMENT;
        return super.setTournamentId(tournamentId);
    }


    public async exec(): Promise<TournamentInterface> {
        return this.run<TournamentInterface>();
    }
}

export default FetchClashTournament;

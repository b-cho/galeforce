import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentInterface } from '../../interfaces/dto';

class GetClashTournament extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TEAM;
    }

    public teamId(teamId: string): this {
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TEAM;
        this.payload.teamId = teamId;
        return this;
    }

    public tournamentId(tournamentId: number): this {
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TOURNAMENT;
        this.payload.tournamentId = tournamentId;
        return this;
    }

    public async exec(): Promise<TournamentInterface> {
        return this.run<TournamentInterface>();
    }
}

export default GetClashTournament;

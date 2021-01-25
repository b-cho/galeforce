import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TournamentInterface } from '../../interfaces/dto';
import { TakesTournamentId, TakesTeamId, TakesRegion } from '../mixins';

const BaseAction =
TakesTournamentId(
    TakesTeamId(
        TakesRegion<LeagueRegion>(
            Action)));

export class GetClashTournament extends BaseAction<TournamentInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<TournamentInterface> {
        if(this.payload.tournamentId) {
            this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TOURNAMENT;
        } else if (this.payload.teamId) {
            this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TEAM;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
        return super.exec();
    }
}

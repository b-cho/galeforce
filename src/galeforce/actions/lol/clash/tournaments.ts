import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentDTO } from '../../../interfaces/dto';
import { TakesTournamentId, TakesTeamId, TakesRegion } from '../../mixins';

const BaseAction = TakesTournamentId(
    TakesTeamId(
        TakesRegion(
            {} as LeagueRegion,
            Action,
        ),
    ),
);

export default class GetClashTournament extends BaseAction<TournamentDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        if (typeof this.payload.tournamentId !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.CLASH.GET_TOURNAMENT;
        } else if (typeof this.payload.teamId !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.CLASH.GET_TEAM_TOURNAMENT;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
    }
}

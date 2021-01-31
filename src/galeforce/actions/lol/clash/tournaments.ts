import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentDTO } from '../../../interfaces/dto';
import { TakesTournamentId, TakesTeamId, TakesRegion } from '../../mixins';

const BaseAction = TakesTournamentId(
    TakesTeamId(
        TakesRegion({} as LeagueRegion,
            Action),
    ),
);

export default class GetClashTournament extends BaseAction<TournamentDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<TournamentDTO> {
        if (this.payload.tournamentId) {
            this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TOURNAMENT;
        } else if (this.payload.teamId) {
            this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.TEAM;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
        return super.exec();
    }
}

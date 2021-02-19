import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesTournamentCode, TakesRegion } from '../../mixins';

const BaseAction = TakesTournamentCode(
    TakesRegion({} as LeagueRegion,
        Action),
);

export default class GetTournamentMatches extends BaseAction<number[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.MATCH.TOURNAMENT_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

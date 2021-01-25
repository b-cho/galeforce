import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesTournamentCode, TakesRegion } from '../mixins';

const BaseAction = TakesTournamentCode(
    TakesRegion<LeagueRegion>(
        Action,
    ),
);

export class GetTournamentMatches extends BaseAction<number[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCH.TOURNAMENT_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

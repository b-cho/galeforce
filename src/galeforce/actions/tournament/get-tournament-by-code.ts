import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TournamentCodeInterface } from '../../interfaces/dto';
import { TakesRegion, TakesTournamentCode } from '../mixins';

const BaseAction =
TakesTournamentCode(
    TakesRegion<LeagueRegion>(
        Action));

export class GetTournamentCodes extends BaseAction<TournamentCodeInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.CODES.BY_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

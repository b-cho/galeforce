import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TournamentRegistrationParameters } from '../../interfaces/parameters';
import { TakesBody, TakesRegion } from '../mixins';

const BaseAction =
TakesBody<TournamentRegistrationParameters>(
    TakesRegion<LeagueRegion>(
        Action));

export class PostTournaments extends BaseAction<number> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.TOURNAMENTS;
        this.payload.type = 'lol';
        this.payload.method = 'POST';
    }
}

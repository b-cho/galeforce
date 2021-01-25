import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TournamentInterface } from '../../interfaces/dto';
import { TakesRegion } from '../mixins';

const BaseAction = TakesRegion<LeagueRegion>(Action);

export class GetUpcomingClashTournaments extends BaseAction<TournamentInterface[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.ALL;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

import { Action } from '../action';
import { TeamInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesTeamId, TakesRegion } from '../mixins';

const BaseAction =
TakesTeamId(
    TakesRegion<LeagueRegion>(
        Action));

export class GetClashTeam extends BaseAction<TeamInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.TEAMS;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

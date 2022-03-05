import Action from '../../action';
import { TeamDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesTeamId, TakesRegion } from '../../mixins';

const BaseAction = TakesTeamId(
    TakesRegion(
        {} as LeagueRegion,
        Action,
    ),
);

export default class GetClashTeam extends BaseAction<TeamDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CLASH.TEAMS;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

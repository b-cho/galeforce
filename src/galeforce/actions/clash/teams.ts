import Action from '../action';
import { TeamInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetClashTeam extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.CLASH.TEAMS);
    }

    public teamId(teamId: string):this {
        this.payload.setTeamId(teamId);
        return this;
    }

    public async exec(): Promise<TeamInterface> {
        return this.run<TeamInterface>();
    }
}

export default GetClashTeam;

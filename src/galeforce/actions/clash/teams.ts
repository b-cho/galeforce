import Action from '../action';
import { TeamInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetClashTeam extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.TEAMS;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public teamId(teamId: string): this {
        this.payload.teamId = teamId;
        return this;
    }

    public async exec(): Promise<TeamInterface> {
        return this.run<TeamInterface>();
    }
}

export default GetClashTeam;

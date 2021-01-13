/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { TeamInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchClashTeamByTeamID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.CLASH.TEAMS);
    }

    public teamId: (teamId: string) => this = super.setTeamId;

    public async exec(): Promise<TeamInterface> {
        return this.run<TeamInterface>();
    }
}

export default FetchClashTeamByTeamID;

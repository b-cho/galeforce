import Action from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { LorLeaderboardInterface } from '../../interfaces/dto';

class GetLorRankedLeaderboard extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LOR_RANKED.LEADERBOARDS;
        this.payload.type = 'riot';
    }

    public region: (region: RiotRegion) => this = super.region;

    public async exec(): Promise<LorLeaderboardInterface> {
        return this.run<LorLeaderboardInterface>();
    }
}

export default GetLorRankedLeaderboard;

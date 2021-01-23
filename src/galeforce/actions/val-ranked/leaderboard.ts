import Action from '../action';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { ValLeaderboardInterface } from '../../interfaces/dto';

type GetValorantRankedLeaderboardQuery = {
    size?: number;
    startIndex?: number;
}

class GetValorantRankedLeaderboard extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_RANKED.LEADERBOARDS;
        this.payload.type = 'val';
    }

    public region: (region: ValorantRegion) => this = super.region;

    public actId(actId: string): this {
        this.payload.actId = actId;
        return this;
    }

    public query(query: GetValorantRankedLeaderboardQuery): this {
        this.payload.query = query;
        return this;
    }

    public async exec(): Promise<ValLeaderboardInterface> {
        return this.run<ValLeaderboardInterface>();
    }
}

export default GetValorantRankedLeaderboard;

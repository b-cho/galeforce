import { Action } from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { LorLeaderboardInterface } from '../../interfaces/dto';
import { TakesRegion } from '../mixins';

const BaseAction = TakesRegion({} as RiotRegion, Action);

export class GetLorRankedLeaderboard extends BaseAction<LorLeaderboardInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LOR_RANKED.LEADERBOARDS;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

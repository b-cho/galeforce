import { Action } from '../action';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { ValLeaderboardInterface } from '../../interfaces/dto';
import { TakesActId, TakesQuery, TakesRegion } from '../mixins';

type GetValorantRankedLeaderboardQuery = {
    size?: number;
    startIndex?: number;
}

const BaseAction = TakesActId(
    TakesQuery({} as GetValorantRankedLeaderboardQuery,
        TakesRegion({} as ValorantRegion,
            Action)),
);

export class GetValorantRankedLeaderboard extends BaseAction<ValLeaderboardInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_RANKED.LEADERBOARDS;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

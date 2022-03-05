import Action from '../../action';
import { ENDPOINTS, ValorantRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { ValLeaderboardDTO } from '../../../interfaces/dto';
import { TakesActId, TakesQuery, TakesRegion } from '../../mixins';

type GetValorantRankedLeaderboardQuery = {
    size?: number;
    startIndex?: number;
}

const BaseAction = TakesActId(
    TakesQuery(
        {} as GetValorantRankedLeaderboardQuery,
        TakesRegion(
            {} as ValorantRegion,
            Action,
        ),
    ),
);

export default class GetValorantRankedLeaderboard extends BaseAction<ValLeaderboardDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.VAL_RANKED.LEADERBOARDS;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

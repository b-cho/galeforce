import { Action } from '../action';
import { MatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesAccountId, TakesQuery, TakesRegion } from '../mixins';

type GetMatchlistQuery = {
    champion?: number[];
    queue?: number[];
    season?: number[];
    endTime?: number;
    beginTime?: number;
    endIndex?: number;
    beginIndex?: number;
}

const BaseAction = TakesAccountId(
    TakesQuery<GetMatchlistQuery>(
        TakesRegion<LeagueRegion>(
            Action,
        ),
    ),
);

export class GetMatchlist extends BaseAction<MatchlistInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

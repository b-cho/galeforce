import Action from '../../action';
import { MatchlistDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesAccountId, TakesQuery, TakesRegion } from '../../mixins';

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
    TakesQuery({} as GetMatchlistQuery,
        TakesRegion({} as LeagueRegion,
            Action)),
);

export default class GetMatchlist extends BaseAction<MatchlistDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCHLIST;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

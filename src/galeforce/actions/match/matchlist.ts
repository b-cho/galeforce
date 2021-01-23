import Action from '../action';
import { MatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

type GetMatchlistQuery = {
    champion?: number[];
    queue?: number[];
    season?: number[];
    endTime?: number;
    beginTime?: number;
    endIndex?: number;
    beginIndex?: number;
}

class GetMatchlist extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public accountId(accountId: string): this {
        this.payload.accountId = accountId;
        return this;
    }

    public query(query: GetMatchlistQuery): this {
        this.payload.query = query;
        return this;
    }

    public async exec(): Promise<MatchlistInterface> {
        return this.run<MatchlistInterface>();
    }
}

export default GetMatchlist;

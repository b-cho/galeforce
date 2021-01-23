import Action from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

type GetTFTMatchlistQuery = {
    count?: number;
}

class GetTFTMatchlist extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TFT_MATCH.MATCHLIST;
        this.payload.type = 'riot';
    }

    public region: (region: RiotRegion) => this = super.region;

    public puuid(puuid: string): this {
        this.payload.puuid = puuid;
        return this;
    }

    public query(query: GetTFTMatchlistQuery): this {
        this.payload.query = query;
        return this;
    }

    public async exec(): Promise<string[]> {
        return this.run<string[]>();
    }
}

export default GetTFTMatchlist;

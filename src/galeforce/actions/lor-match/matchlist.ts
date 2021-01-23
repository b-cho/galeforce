import Action from '../action';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetLorMatchlist extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LOR_MATCH.MATCHLIST;
        this.payload.type = 'riot';
    }

    public region: (region: RiotRegion) => this = super.region;

    public puuid(puuid: string): this {
        this.payload.puuid = puuid;
        return this;
    }

    public async exec(): Promise<string[]> {
        return this.run<string[]>();
    }
}

export default GetLorMatchlist;

import Action from '../action';
import { LorMatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetLorMatch extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LOR_MATCH.MATCH;
        this.payload.type = 'riot';
    }

    public region: (region: RiotRegion) => this = super.region;

    public matchId(matchId: string): this {
        this.payload.matchId = matchId;
        return this;
    }

    public async exec(): Promise<LorMatchInterface> {
        return this.run<LorMatchInterface>();
    }
}

export default GetLorMatch;

import Action from '../action';
import { TFTMatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetTFTMatch extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TFT_MATCH.MATCH;
        this.payload.type = 'riot';
    }

    public region: (region: RiotRegion) => this = super.region;

    public matchId(matchId: string): this {
        this.payload.matchId = matchId;
        return this;
    }

    public async exec(): Promise<TFTMatchInterface> {
        return this.run<TFTMatchInterface>();
    }
}

export default GetTFTMatch;

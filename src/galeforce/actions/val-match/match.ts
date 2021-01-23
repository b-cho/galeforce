import Action from '../action';
import { ValMatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetValorantMatch extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.MATCH;
        this.payload.type = 'val';
    }

    public region: (region: ValorantRegion) => this = super.region;

    public matchId(matchId: number): this {
        this.payload.matchId = matchId;
        return this;
    }

    public async exec(): Promise<ValMatchInterface> {
        return this.run<ValMatchInterface>();
    }
}

export default GetValorantMatch;

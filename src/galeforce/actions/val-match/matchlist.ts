import Action from '../action';
import { ValMatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetValorantMatchlist extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.MATCHLIST;
        this.payload.type = 'val';
    }

    public region: (region: ValorantRegion) => this = super.region;

    public puuid(puuid: string): this {
        this.payload.puuid = puuid;
        return this;
    }

    public async exec(): Promise<ValMatchlistInterface> {
        return this.run<ValMatchlistInterface>();
    }
}

export default GetValorantMatchlist;

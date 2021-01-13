import Action from '../action';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchThirdPartyCodeBySummonerId extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.PLATFORM.THIRD_PARTY_CODE);
    }

    public summonerId(summonerId: string): this {
        this.payload.setSummonerId(summonerId);
        return this;
    }

    public async exec(): Promise<string> {
        return this.run<string>();
    }
}

export default FetchThirdPartyCodeBySummonerId;

import Action from '../action';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchThirdPartyCodeBySummonerId extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.PLATFORM.THIRD_PARTY_CODE);
    }

    public region: (region: Region) => this = super.setRegion;

    public summonerId: (summonerId: string) => this = super.setSummonerId;

    public async exec(): Promise<string> {
        return this.run<string>();
    }
}

export default FetchThirdPartyCodeBySummonerId;

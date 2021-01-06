import Action from '../action';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchThirdPartyCodeBySummonerId extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap, ENDPOINTS.PLATFORM.THIRD_PARTY_CODE.SUMMONER_ID);
    }

    public region: (region: Region) => this = super.region;

    public summonerId: (summonerId: string) => this = super.summonerId;

    public async exec(): Promise<string> {
        return this.run<string>();
    }
}

export default FetchThirdPartyCodeBySummonerId;

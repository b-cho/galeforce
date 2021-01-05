import Action from '../action';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchThirdPartyCodeBySummonerId extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, server: Region, summonerId: string) {
        super(SubmoduleMap, server);

        this.summonerId = summonerId;
    }

    public async exec(): Promise<string> {
        return await this.run<string>(ENDPOINTS.PLATFORM.THIRD_PARTY_CODE.SUMMONER_ID, { server: this.server, 'summoner-id': this.summonerId });
    }
}

export default FetchThirdPartyCodeBySummonerId;

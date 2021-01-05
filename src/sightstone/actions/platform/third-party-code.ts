import Action from '../action';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchThirdPartyCodeBySummonerId extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.PLATFORM.THIRD_PARTY_CODE.SUMMONER_ID;
    }

    public region: (region: Region) => this = super.region;

    public summonerId: (summonerId: string) => this = super.summonerId;

    public async exec(): Promise<string> {
        if(typeof this.payload.summonerId === 'undefined') {
            throw new Error('[sightstone]: Action payload summonerId is undefined.');
        }
        return this.run<string>();
    }
}

export default FetchThirdPartyCodeBySummonerId;

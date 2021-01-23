import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetThirdPartyCode extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.PLATFORM.THIRD_PARTY_CODE;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<string> {
        return this.run<string>();
    }
}

export default GetThirdPartyCode;

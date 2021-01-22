import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetThirdPartyCode extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.PLATFORM.THIRD_PARTY_CODE;
    }

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<string> {
        return this.run<string>();
    }
}

export default GetThirdPartyCode;

import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesRegion, TakesSummonerId } from '../../mixins';

const BaseAction = TakesSummonerId(
    TakesRegion(
        {} as LeagueRegion,
        Action,
    ),
);

export default class GetThirdPartyCode extends BaseAction<string> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.PLATFORM.THIRD_PARTY_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

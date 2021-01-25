import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesRegion, TakesSummonerId } from '../mixins';

const BaseAction =
TakesSummonerId(
    TakesRegion<LeagueRegion>(
        Action));

export class GetThirdPartyCode extends BaseAction<string> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.PLATFORM.THIRD_PARTY_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

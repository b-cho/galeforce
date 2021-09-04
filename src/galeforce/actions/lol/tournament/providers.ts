import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { ProviderRegistrationParameters } from '../../../interfaces/parameters';
import { TakesBody, TakesRegion } from '../../mixins';

const BaseAction = TakesBody({} as ProviderRegistrationParameters,
    TakesRegion({} as RiotRegion,
        Action));

export default class PostProviders extends BaseAction<string[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.PROVIDERS;
        this.payload.type = 'riot';
        this.payload.method = 'POST';
    }
}

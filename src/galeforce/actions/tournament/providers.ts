import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { ProviderRegistrationParameters } from '../../interfaces/parameters';
import { TakesBody, TakesRegion } from '../mixins';

const BaseAction =
TakesBody<ProviderRegistrationParameters>(
    TakesRegion<LeagueRegion>(
        Action));

export class PostProviders extends BaseAction<string[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.PROVIDERS;
        this.payload.type = 'lol';
        this.payload.method = 'POST';
    }
}

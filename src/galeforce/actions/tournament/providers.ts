import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { ProviderRegistrationParameters } from '../../interfaces/parameters';

class PostProviders extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.PROVIDERS;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public body(body: ProviderRegistrationParameters): this {
        this.payload.body = body;
        return this;
    }

    public async exec(): Promise<string[]> {
        return this.run<string[]>('POST');
    }
}

export default PostProviders;

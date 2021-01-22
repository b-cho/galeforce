import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { ProviderRegistrationParameters } from '../../interfaces/parameters';

class PostProviders extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.PROVIDERS;
    }

    public body(body: ProviderRegistrationParameters): this {
        this.payload.body = body;
        return this;
    }

    public async exec(): Promise<string[]> {
        return this.run<string[]>('POST');
    }
}

export default PostProviders;

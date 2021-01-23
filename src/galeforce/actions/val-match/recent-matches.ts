import Action from '../action';
import { ValMatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, ValorantQueue, ValorantRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetValorantRecentMatches extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_MATCH.RECENT;
        this.payload.type = 'val';
    }

    public region: (region: ValorantRegion) => this = super.region;

    public queue(queue: ValorantQueue): this {
        this.payload.queue = queue;
        return this;
    }

    public async exec(): Promise<ValMatchlistInterface> {
        return this.run<ValMatchlistInterface>();
    }
}

export default GetValorantRecentMatches;

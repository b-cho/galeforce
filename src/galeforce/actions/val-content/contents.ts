import Action from '../action';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { ValContentInterface } from '../../interfaces/dto';

type GetValorantContentQuery = {
    locale?: string;
}

class GetValorantContent extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_CONTENT.CONTENTS;
        this.payload.type = 'val';
    }

    public region: (region: ValorantRegion) => this = super.region;

    public query(query: GetValorantContentQuery): this {
        this.payload.query = query;
        return this;
    }

    public async exec(): Promise<ValContentInterface> {
        return this.run<ValContentInterface>();
    }
}

export default GetValorantContent;

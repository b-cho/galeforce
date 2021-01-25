import { Action } from '../action';
import { ENDPOINTS, ValorantRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { ValContentInterface } from '../../interfaces/dto';
import { TakesQuery, TakesRegion } from '../mixins';

type GetValorantContentQuery = {
    locale?: string;
}

const BaseAction = TakesQuery<GetValorantContentQuery>(
    TakesRegion<ValorantRegion>(
        Action,
    ),
);

export class GetValorantContent extends BaseAction<ValContentInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.VAL_CONTENT.CONTENTS;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

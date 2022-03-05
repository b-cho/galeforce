import Action from '../../action';
import { ENDPOINTS, ValorantRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { ValContentDTO } from '../../../interfaces/dto';
import { TakesQuery, TakesRegion } from '../../mixins';

type GetValorantContentQuery = {
    locale?: string;
}

const BaseAction = TakesQuery(
    {} as GetValorantContentQuery,
    TakesRegion(
        {} as ValorantRegion,
        Action,
    ),
);

export default class GetValorantContent extends BaseAction<ValContentDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.VAL_CONTENT.CONTENTS;
        this.payload.type = 'val';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { RiftboundContentDTO } from '../../../interfaces/dto';
import { TakesQuery, TakesRegion } from '../../mixins';

type GetRiftboundContentQuery = {
    locale?: string;
}

const BaseAction = TakesQuery(
    {} as GetRiftboundContentQuery,
    TakesRegion(
        {} as RiotRegion,
        Action,
    ),
);

export default class GetRiftboundContent extends BaseAction<RiftboundContentDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.RIFTBOUND_CONTENT.CONTENTS;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

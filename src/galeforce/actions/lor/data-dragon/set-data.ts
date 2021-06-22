import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesLocale, TakesLorSet, TakesVersion } from '../../mixins';
import { LorDataDragonSetDataDTO } from '../../../interfaces/dto';

const BaseAction = TakesVersion(
    TakesLocale(
        TakesLorSet(
            Action,
        ),
    ),
);

export default class GetLorDataDragonSetData extends BaseAction<LorDataDragonSetDataDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lor-ddragon';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.SET_DATA;
    }
}

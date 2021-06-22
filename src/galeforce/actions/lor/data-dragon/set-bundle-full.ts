import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesLocale, TakesLorSet, TakesVersion } from '../../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        TakesLorSet(
            Action,
        ),
    ),
);

export default class GetLorDataDragonFullSetBundle extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lor-ddragon-buffer';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.SET_BUNDLE_FULL;
    }
}

import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesLocale, TakesLorRegion, TakesVersion } from '../../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        TakesLorRegion(
            Action,
        ),
    ),
);

export default class GetLorDataDragonCoreRegionIcons extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lor-ddragon-buffer';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.CORE_REGION_ICONS;
    }
}

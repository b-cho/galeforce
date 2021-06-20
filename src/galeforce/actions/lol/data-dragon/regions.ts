import Action from '../../action';
import { DataDragonRegion, ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { DataDragonRegionDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as DataDragonRegion, Action);

export default class GetDataDragonRegionInfo extends BaseAction<DataDragonRegionDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.REGIONS;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

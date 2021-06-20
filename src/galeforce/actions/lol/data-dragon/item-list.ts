import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { DataDragonItemListDTO } from '../../../interfaces/dto';
import { TakesVersion, TakesLocale } from '../../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        Action,
    ),
);

export default class GetDataDragonItemList extends BaseAction<DataDragonItemListDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.ITEM_LIST;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

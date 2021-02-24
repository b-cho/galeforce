import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { DataDragonProfileIconListDTO } from '../../interfaces/dto';
import { TakesVersion, TakesLocale } from '../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        Action,
    ),
);

export default class GetDataDragonProfileIconList extends BaseAction<DataDragonProfileIconListDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.DATA_DRAGON.PROFILE_ICON_LIST;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

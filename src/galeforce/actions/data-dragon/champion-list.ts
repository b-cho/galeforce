import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { DataDragonChampionListDTO } from '../../interfaces/dto';
import { TakesVersion, TakesLocale } from '../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        Action,
    ),
);

export default class GetDataDragonChampionList extends BaseAction<DataDragonChampionListDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.DATA_DRAGON.CHAMPION_LIST;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

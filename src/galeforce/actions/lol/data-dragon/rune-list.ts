import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { DataDragonRuneDTO } from '../../../interfaces/dto';
import { TakesVersion, TakesLocale } from '../../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        Action,
    ),
);

export default class GetDataDragonRuneList extends BaseAction<DataDragonRuneDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.RUNE_LIST;
        this.payload.type = 'lol-ddragon';
        this.payload.method = 'GET';
    }
}

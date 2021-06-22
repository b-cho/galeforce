import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { DataDragonRegionDTO } from '../../../interfaces/dto';
import { TakesVersion, TakesLocale, TakesChampion } from '../../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        TakesChampion(
            Action,
        ),
    ),
);

export default class GetDataDragonChampionJSON extends BaseAction<DataDragonRegionDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.CHAMPION;
        this.payload.type = 'lol-ddragon';
        this.payload.method = 'GET';
    }
}

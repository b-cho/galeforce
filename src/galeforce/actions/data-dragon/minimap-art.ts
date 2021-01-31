import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { TakesDataDragonId, TakesVersion } from '../mixins';

const BaseAction = TakesVersion(
    TakesDataDragonId(
        Action,
    ),
);

export default class GetDataDragonMinimapArt extends BaseAction<string> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.DATA_DRAGON.MINIMAP_ART;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

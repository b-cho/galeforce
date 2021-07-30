import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesDataDragonId, TakesVersion } from '../../mixins';

const BaseAction = TakesVersion(
    TakesDataDragonId(
        Action,
    ),
);

export default class GetDataDragonMinimapArt extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.MINIMAP_ART;
        this.payload.type = 'lol-ddragon-buffer';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesAssetPath } from '../../mixins';

const BaseAction = TakesAssetPath(Action);

export default class GetDataDragonRuneArt extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.RUNE_ART;
        this.payload.type = 'lol-ddragon-buffer';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSkin, TakesChampion } from '../../mixins';

const BaseAction = TakesSkin(
    TakesChampion(
        Action,
    ),
);

export default class GetDataDragonSplashArt extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.LOADING_ART;
        this.payload.type = 'ddragon-buffer';
        this.payload.method = 'GET';
    }
}

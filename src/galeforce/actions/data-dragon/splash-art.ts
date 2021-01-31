import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { TakesSkin, TakesChampion } from '../mixins';

const BaseAction = TakesSkin(
    TakesChampion(
        Action,
    ),
);

export default class GetDataDragonSplashArt extends BaseAction<string> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.DATA_DRAGON.LOADING_ART;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

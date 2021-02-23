import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { TakesChampion, TakesVersion } from '../mixins';

const BaseAction = TakesVersion(
    TakesChampion(
        Action,
    ),
);

export default class GetDataDragonChampionSquareArt extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.DATA_DRAGON.SQUARE_ART;
        this.payload.type = 'ddragon-buffer';
        this.payload.method = 'GET';
    }
}

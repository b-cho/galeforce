import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSpell, TakesVersion } from '../../mixins';

const BaseAction = TakesVersion(
    TakesSpell(
        Action,
    ),
);

export default class GetDataDragonChampionPassiveArt extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.CHAMPION_PASSIVE_ART;
        this.payload.type = 'ddragon-buffer';
        this.payload.method = 'GET';
    }
}

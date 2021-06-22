import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSpell, TakesVersion } from '../../mixins';

const BaseAction = TakesVersion(
    TakesSpell(
        Action,
    ),
);

export default class GetDataDragonSpellArt extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.SPELL_ART;
        this.payload.type = 'lol-ddragon-buffer';
        this.payload.method = 'GET';
    }
}

import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';
import { DataDragonSummonerListDTO } from '../../interfaces/dto';
import { TakesVersion, TakesLocale } from '../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        Action,
    ),
);

export default class GetDataDragonSummonerSpellList extends BaseAction<DataDragonSummonerListDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.DATA_DRAGON.SUMMONER_SPELL_LIST;
        this.payload.type = 'ddragon';
        this.payload.method = 'GET';
    }
}

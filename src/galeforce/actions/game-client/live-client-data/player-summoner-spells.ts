import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSummonerName } from '../../mixins';
import { LiveClientSummonerSpellsDTO } from '../../../interfaces/dto';

const BaseAction = TakesSummonerName(Action);

export default class GetLiveClientPlayerSummonerSpells extends BaseAction<LiveClientSummonerSpellsDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.PLAYER_SUMMONER_SPELLS;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

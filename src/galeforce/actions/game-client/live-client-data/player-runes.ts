import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSummonerName } from '../../mixins';
import { LiveClientMainRunesDTO } from '../../../interfaces/dto';

const BaseAction = TakesSummonerName(Action);

export default class GetLiveClientPlayerRunes extends BaseAction<LiveClientMainRunesDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.PLAYER_RUNES;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSummonerName } from '../../mixins';
import { LiveClientItemDTO } from '../../../interfaces/dto';

const BaseAction = TakesSummonerName(Action);

export default class GetLiveClientPlayerItems extends BaseAction<LiveClientItemDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.PLAYER_ITEMS;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

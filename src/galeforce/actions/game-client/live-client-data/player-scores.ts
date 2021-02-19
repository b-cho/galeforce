import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesSummonerName } from '../../mixins';
import { LiveClientScoreDTO } from '../../../interfaces/dto';

const BaseAction = TakesSummonerName(Action);

export default class GetLiveClientPlayerScores extends BaseAction<LiveClientScoreDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.GAME_CLIENT.PLAYER_SCORES;
        this.payload.type = 'gc';
        this.payload.method = 'GET';
    }
}

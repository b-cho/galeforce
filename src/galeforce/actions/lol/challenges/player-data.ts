import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { PlayerInfoDTO } from '../../../interfaces/dto';
import { TakesPUUID, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRegion({} as LeagueRegion, Action),
);

export default class GetPlayerChallengeData extends BaseAction<PlayerInfoDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHALLENGES.PLAYER_DATA;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

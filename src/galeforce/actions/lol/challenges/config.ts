import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { ChallengeConfigInfoDTO } from '../../../interfaces/dto';
import { TakesChallengeId, TakesRegion } from '../../mixins';

const BaseAction = TakesChallengeId(
    TakesRegion({} as LeagueRegion, Action)
);

export default class GetChallengeConfig extends BaseAction<ChallengeConfigInfoDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHALLENGES.CONFIG;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

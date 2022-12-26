import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { ChallengeConfigInfoDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as LeagueRegion, Action);

export default class GetChallengeConfigList extends BaseAction<ChallengeConfigInfoDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHALLENGES.CONFIG_LIST;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

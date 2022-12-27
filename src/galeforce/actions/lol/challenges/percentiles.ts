import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { PercentilesDTO } from '../../../interfaces/dto';
import { TakesChallengeId, TakesRegion } from '../../mixins';

const BaseAction = TakesChallengeId(
    TakesRegion({} as LeagueRegion, Action),
);

export default class GetChallengePercentiles extends BaseAction<PercentilesDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHALLENGES.PERCENTILES;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

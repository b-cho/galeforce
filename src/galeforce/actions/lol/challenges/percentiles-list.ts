import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { PercentilesDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as LeagueRegion, Action);

export default class GetChallengePercentilesList extends BaseAction<{[key: number]: PercentilesDTO}> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHALLENGES.PERCENTILES_LIST;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

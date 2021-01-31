import Action from '../../action';
import { MatchTimelineDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../../mixins';

const BaseAction = TakesMatchId(
    TakesRegion({} as LeagueRegion,
        Action),
);

export default class GetTimeline extends BaseAction<MatchTimelineDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.MATCH.TIMELINE.MATCH_ID;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

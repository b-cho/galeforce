import { Action } from '../action';
import { MatchTimelineInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../mixins';

const BaseAction = TakesMatchId(
    TakesRegion<LeagueRegion>(
        Action));

export class GetTimeline extends BaseAction<MatchTimelineInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.TIMELINE.MATCH_ID;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

import Action from '../action';
import { MatchTimelineInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetTimelineByMatchID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.MATCH.TIMELINE.MATCH_ID);
    }

    public matchId(matchId: number): this { 
        this.payload.setMatchId(matchId);
        return this;
    }

    public async exec(): Promise<MatchTimelineInterface> {
        return this.run<MatchTimelineInterface>();
    }
}

export default GetTimelineByMatchID;

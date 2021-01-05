/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchTimelineInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchTimelineByMatchID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, server: Region, matchId: number) {
        super(SubmoduleMap, server);

        this.matchId = matchId;
    }

    public async exec(): Promise<MatchTimelineInterface> {
        return this.run<MatchTimelineInterface>(ENDPOINTS.MATCH.TIMELINE.MATCH_ID, { server: this.server, 'match-id': this.matchId });
    }
}

export default FetchTimelineByMatchID;

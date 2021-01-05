/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchTimelineInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchTimelineByMatchID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.TIMELINE.MATCH_ID;
    }

    public region: (region: Region) => this = this.region;

    public matchId: (matchId: number) => this = this.matchId;

    public async exec(): Promise<MatchTimelineInterface> {
        if(typeof this.payload.matchId === 'undefined') {
            throw new Error('[sightstone]: Action payload matchId is undefined.');
        }
        return this.run<MatchTimelineInterface>();
    }
}

export default FetchTimelineByMatchID;

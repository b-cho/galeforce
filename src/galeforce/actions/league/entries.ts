/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Queue, Tier, Division } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchLeagueEntries extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.LEAGUE.SUMMONER_ID);
    }

    public queue(queue: Queue): this {
        if(this.payload.endpoint === ENDPOINTS.LEAGUE.SUMMONER_ID) {
            this.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK);
        }
        return super.setQueue(queue);
    }

    public tier(tier: Tier): this {
        if ([Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(tier)) {
            this.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK_EXP); // set to experimental endpoint for support
        } else {
            this.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK); // set to default endpoint
        }
        
        return super.setTier(tier);
    };

    public division(division: Division): this {
        if(this.payload.endpoint === ENDPOINTS.LEAGUE.SUMMONER_ID) {
            this.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK);
        }
        return super.setDivision(division);
    }

    public summonerId: (summonerId: string) => this = super.setSummonerId;

    public async exec(): Promise<LeagueEntryInterface[]> {
        return this.run<LeagueEntryInterface[]>();
    }
}

export default FetchLeagueEntries;

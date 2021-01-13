import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Queue, Tier, Division } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetLeagueEntries extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.LEAGUE.SUMMONER_ID);
    }

    public queue(queue: Queue): this {
        if(this.payload.payload.endpoint === ENDPOINTS.LEAGUE.SUMMONER_ID) {
            this.payload.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK);
        }
        this.payload.setQueue(queue);
        return this;
    }

    public tier(tier: Tier): this {
        if ([Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(tier)) {
            this.payload.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK_EXP); // set to experimental endpoint for support
        } else {
            this.payload.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK); // set to default endpoint
        }
        
        this.payload.setTier(tier);
        return this;
    };

    public division(division: Division): this {
        if(this.payload.payload.endpoint === ENDPOINTS.LEAGUE.SUMMONER_ID) {
            this.payload.setEndpoint(ENDPOINTS.LEAGUE.ENTRIES_BY_RANK);
        }
        this.payload.setDivision(division);
        return this;
    }

    public summonerId(summonerId: string): this {
        this.payload.setSummonerId(summonerId);
        return this;
    }

    public async exec(): Promise<LeagueEntryInterface[]> {
        return this.run<LeagueEntryInterface[]>();
    }
}

export default GetLeagueEntries;

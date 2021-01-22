import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import {
    ENDPOINTS, Queue, Tier, Division,
} from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetLeagueEntries extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LEAGUE.SUMMONER_ID;
    }

    public queue(queue: Queue): this {
        if (this.payload.endpoint === ENDPOINTS.LEAGUE.SUMMONER_ID) {
            this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK;
        }
        this.payload.queue = queue;
        return this;
    }

    public tier(tier: Tier): this {
        if ([Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(tier)) {
            this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK_EXP; // set to experimental endpoint for support
        } else {
            this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK; // set to default endpoint
        }

        this.payload.tier = tier;
        return this;
    }

    public division(division: Division): this {
        if (this.payload.endpoint === ENDPOINTS.LEAGUE.SUMMONER_ID) {
            this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK;
        }
        this.payload.division = division;
        return this;
    }

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<LeagueEntryInterface[]> {
        return this.run<LeagueEntryInterface[]>();
    }
}

export default GetLeagueEntries;

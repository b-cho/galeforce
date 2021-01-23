import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import {
    ENDPOINTS, Tier, Division, LeagueRegion, LeagueQueue,
} from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

type GetLeagueEntriesQuery = {
    page?: number;
}

class GetLeagueEntries extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LEAGUE.SUMMONER_ID;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public queue(queue: LeagueQueue): this {
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

    public query(query: GetLeagueEntriesQuery): this {
        this.payload.query = query;
        return this;
    }

    public async exec(): Promise<LeagueEntryInterface[]> {
        return this.run<LeagueEntryInterface[]>();
    }
}

export default GetLeagueEntries;

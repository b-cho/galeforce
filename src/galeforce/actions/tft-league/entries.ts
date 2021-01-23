import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import {
    ENDPOINTS, Tier, Division, LeagueRegion,
} from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

type GetTFTLeagueEntriesQuery = {
    page?: number;
}

class GetTFTLeagueEntries extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public tier(tier: Tier): this {
        if ([Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(tier)) {
            throw new Error('[galeforce]: /tft/league/v1/entries does not currently support the apex tiers.');
        }

        this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.ENTRIES_BY_RANK; // set to default endpoint
        this.payload.tier = tier;
        return this;
    }

    public division(division: Division): this {
        this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.ENTRIES_BY_RANK;
        this.payload.division = division;
        return this;
    }

    public summonerId(summonerId: string): this {
        this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.SUMMONER_ID;
        this.payload.summonerId = summonerId;
        return this;
    }

    public query(query: GetTFTLeagueEntriesQuery): this {
        this.payload.query = query;
        return this;
    }

    public async exec(): Promise<LeagueEntryInterface[]> {
        return this.run<LeagueEntryInterface[]>();
    }
}

export default GetTFTLeagueEntries;

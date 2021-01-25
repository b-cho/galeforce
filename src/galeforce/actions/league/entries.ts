import { Action } from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Tier, LeagueRegion, LeagueQueue } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesDivision, TakesQuery, TakesQueue, TakesRegion, TakesSummonerId, TakesTier } from '../mixins';

type GetLeagueEntriesQuery = {
    page?: number;
}

const BaseAction =
TakesQueue<LeagueQueue>(
    TakesTier(
        TakesDivision(
            TakesSummonerId(
                TakesQuery<GetLeagueEntriesQuery>(
                    TakesRegion<LeagueRegion>(
                        Action))))));

export class GetLeagueEntries extends BaseAction<LeagueEntryInterface[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<LeagueEntryInterface[]> {
        if (this.payload.summonerId) {
            this.payload.endpoint = ENDPOINTS.LEAGUE.SUMMONER_ID
        } else if (this.payload.queue || this.payload.tier || this.payload.division) {
            if (this.payload.tier && [Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(this.payload.tier)) {
                // set to experimental endpoint for support
                this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK_EXP;
            } else {
                this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK; // set to default endpoint
            }
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }

        return super.exec();
    }
}

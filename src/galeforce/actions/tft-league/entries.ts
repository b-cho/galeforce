import { Action } from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import {
    ENDPOINTS, Tier, LeagueRegion,
} from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import {
    TakesDivision, TakesQuery, TakesRegion, TakesSummonerId, TakesTier,
} from '../mixins';

type GetTFTLeagueEntriesQuery = {
    page?: number;
}

const BaseAction = TakesQuery<GetTFTLeagueEntriesQuery>(
    TakesTier(
        TakesDivision(
            TakesSummonerId(
                TakesRegion<LeagueRegion>(
                    Action,
                ),
            ),
        ),
    ),
);

export class GetTFTLeagueEntries extends BaseAction<LeagueEntryInterface[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<LeagueEntryInterface[]> {
        if (this.payload.summonerId) {
            this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.SUMMONER_ID;
        } else if (this.payload.division || this.payload.tier) {
            if (this.payload.tier && [Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(this.payload.tier)) {
                throw new Error('[galeforce]: /tft/league/v1/entries does not currently support the apex tiers.');
            }
            this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.ENTRIES_BY_RANK;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }

        return super.exec();
    }
}

import Action from '../../action';
import { LeagueEntryDTO } from '../../../interfaces/dto';
import {
    ENDPOINTS, Tier, LeagueRegion,
} from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import {
    TakesDivision, TakesQuery, TakesRegion, TakesSummonerId, TakesTier,
} from '../../mixins';

type GetTFTLeagueEntriesQuery = {
    page?: number;
}

const BaseAction = TakesQuery({} as GetTFTLeagueEntriesQuery,
    TakesTier(
        TakesDivision(
            TakesSummonerId(
                TakesRegion({} as LeagueRegion,
                    Action),
            ),
        ),
    ));

export default class GetTFTLeagueEntries extends BaseAction<LeagueEntryDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
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
    }
}

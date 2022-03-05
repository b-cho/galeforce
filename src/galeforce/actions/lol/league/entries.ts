import Action from '../../action';
import { LeagueEntryDTO } from '../../../interfaces/dto';
import {
    ENDPOINTS, Tier, LeagueRegion, LeagueQueue,
} from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import {
    TakesDivision, TakesQuery, TakesQueue, TakesRegion, TakesSummonerId, TakesTier,
} from '../../mixins';

type GetLeagueEntriesQuery = {
    page?: number;
}

const BaseAction = TakesQueue(
    {} as LeagueQueue,
    TakesTier(
        TakesDivision(
            TakesSummonerId(
                TakesQuery(
                    {} as GetLeagueEntriesQuery,
                    TakesRegion(
                        {} as LeagueRegion,
                        Action,
                    ),
                ),
            ),
        ),
    ),
);

export default class GetLeagueEntries extends BaseAction<LeagueEntryDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        if (typeof this.payload.summonerId !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.LEAGUE.SUMMONER_ID;
        } else if (typeof this.payload.queue !== 'undefined' || typeof this.payload.tier !== 'undefined' || typeof this.payload.division !== 'undefined') {
            if (typeof this.payload.tier !== 'undefined' && [Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(this.payload.tier)) {
                // set to experimental endpoint for support
                this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK_EXP;
            } else {
                this.payload.endpoint = ENDPOINTS.LEAGUE.ENTRIES_BY_RANK; // set to default endpoint
            }
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
    }
}

import Action from '../../action';
import { LeagueListDTO } from '../../../interfaces/dto';
import {
    ENDPOINTS, LeagueRegion, Tier,
} from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesTier, TakesRegion, TakesLeagueId } from '../../mixins';

const BaseAction = TakesTier(
    TakesLeagueId(
        TakesRegion({} as LeagueRegion,
            Action),
    ),
);

export default class GetTFTLeagueList extends BaseAction<LeagueListDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        if (typeof this.payload.leagueId !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.LEAGUE_ID;
        } else if (typeof this.payload.tier !== 'undefined') {
            switch (this.payload.tier) {
            case Tier.CHALLENGER:
                this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.CHALLENGER_LEAGUE;
                break;
            case Tier.GRANDMASTER:
                this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.GRANDMASTER_LEAGUE;
                break;
            case Tier.MASTER:
                this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.MASTER_LEAGUE;
                break;
            default:
                throw new Error('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.');
            }
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
    }
}

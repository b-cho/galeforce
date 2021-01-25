import { Action } from '../action';
import { LeagueListInterface } from '../../interfaces/dto';
import {
    ENDPOINTS, LeagueRegion, LeagueQueue, Tier,
} from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesQueue, TakesTier, TakesDivision, TakesLeagueId, TakesRegion } from '../mixins';

const BaseAction = 
TakesQueue<LeagueQueue>(
    TakesTier(
        TakesLeagueId(
            TakesRegion<LeagueRegion>(
                Action))));
                    
export class GetLeagueList extends BaseAction<LeagueListInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<LeagueListInterface> {
        if (this.payload.leagueId) {
            this.payload.endpoint = ENDPOINTS.LEAGUE.LEAGUE_ID;
        } else if (this.payload.tier) {
            switch (this.payload.tier) {
            case Tier.CHALLENGER:
                this.payload.endpoint = ENDPOINTS.LEAGUE.CHALLENGER_LEAGUE;
                break;
            case Tier.GRANDMASTER:
                this.payload.endpoint = ENDPOINTS.LEAGUE.GRANDMASTER_LEAGUE;
                break;
            case Tier.MASTER:
                this.payload.endpoint = ENDPOINTS.LEAGUE.MASTER_LEAGUE;
                break;
            default:
                throw new Error('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.');
            }
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
        
        return super.exec();
    }
}

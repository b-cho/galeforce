import Action from '../action';
import { LeagueListInterface } from '../../interfaces/dto';
import {
    ENDPOINTS, LeagueRegion, LeagueQueue, Tier,
} from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetLeagueList extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.LEAGUE.LEAGUE_ID;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public queue(queue: LeagueQueue): this {
        this.payload.queue = queue;
        return this;
    }

    public tier(tier: Tier): this {
        switch (tier) {
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

        this.payload.tier = tier;
        return this;
    }

    public leagueId(leagueId: string): this {
        this.payload.leagueId = leagueId;
        return this;
    }

    public async exec(): Promise<LeagueListInterface> {
        if (this.payload.queue && !this.payload.tier) {
            throw new Error('[galeforce]: .queue() must be chained with .tier().');
        }
        return this.run<LeagueListInterface>();
    }
}

export default GetLeagueList;

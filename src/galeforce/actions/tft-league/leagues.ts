import Action from '../action';
import { LeagueListInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion, LeagueQueue, Tier } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetTFTLeagueList extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.LEAGUE_ID;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public queue(queue: LeagueQueue): this {
        this.payload.queue = queue;
        return this;
    }

    public tier(tier: Tier): this {
        if (tier === Tier.CHALLENGER) this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.CHALLENGER_LEAGUE;
        else if (tier === Tier.GRANDMASTER) this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.GRANDMASTER_LEAGUE;
        else if (tier === Tier.MASTER) this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.MASTER_LEAGUE;
        else throw new Error('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.');
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

export default GetTFTLeagueList;

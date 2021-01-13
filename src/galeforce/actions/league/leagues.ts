import Action from '../action';
import { LeagueListInterface } from '../../interfaces/dto';
import { ENDPOINTS, Queue, Tier } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchLeagueList extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.LEAGUE.LEAGUE_ID);
    }

    public queue(queue: Queue): this {
        this.payload.setQueue(queue);
        return this;
    }

    public tier(tier: Tier): this {
        if(tier === Tier.CHALLENGER) this.payload.setEndpoint(ENDPOINTS.LEAGUE.CHALLENGER_LEAGUE);
        else if(tier === Tier.GRANDMASTER) this.payload.setEndpoint(ENDPOINTS.LEAGUE.GRANDMASTER_LEAGUE);
        else if(tier === Tier.MASTER) this.payload.setEndpoint(ENDPOINTS.LEAGUE.MASTER_LEAGUE);
        else throw new Error('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.')
        this.payload.setTier(tier);
        return this;
    }

    public leagueId(leagueId: string): this {
        this.payload.setLeagueId(leagueId);
        return this;
    }

    public async exec(): Promise<LeagueListInterface> {
        if(this.payload.payload.queue && !this.payload.payload.tier) {
            throw new Error('[galeforce]: .queue() must be chained with .tier().')
        }
        return this.run<LeagueListInterface>();
    }
}

export default FetchLeagueList;

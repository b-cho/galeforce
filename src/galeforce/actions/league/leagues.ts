import Action from '../action';
import { LeagueListInterface } from '../../interfaces/dto';
import { ENDPOINTS, Queue, Tier } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchLeagueList extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.LEAGUE.LEAGUE_ID);
    }

    public queue: (queue: Queue) => this = super.setQueue;

    public tier(tier: Tier): this {
        if(tier === Tier.CHALLENGER) this.setEndpoint(ENDPOINTS.LEAGUE.CHALLENGER_LEAGUE);
        else if(tier === Tier.GRANDMASTER) this.setEndpoint(ENDPOINTS.LEAGUE.GRANDMASTER_LEAGUE);
        else if(tier === Tier.MASTER) this.setEndpoint(ENDPOINTS.LEAGUE.MASTER_LEAGUE);
        else throw new Error('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.')
        return super.setTier(tier);
    }

    public leagueId: (leagueId: string) => this = super.setLeagueId;

    public async exec(): Promise<LeagueListInterface> {
        if(this.payload.queue && !this.payload.tier) {
            throw new Error('[galeforce]: .queue() must be chained with .tier().')
        }
        return this.run<LeagueListInterface>();
    }
}

export default FetchLeagueList;

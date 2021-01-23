import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { FeaturedGamesInterface } from '../../interfaces/dto';

class GetFeaturedGames extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.FEATURED;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public async exec(): Promise<FeaturedGamesInterface> {
        return this.run<FeaturedGamesInterface>();
    }
}

export default GetFeaturedGames;

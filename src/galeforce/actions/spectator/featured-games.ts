import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { FeaturedGamesInterface } from '../../interfaces/dto';

class FetchFeaturedGames extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.SPECTATOR.FEATURED);
    }

    public async exec(): Promise<FeaturedGamesInterface> {
        return this.run<FeaturedGamesInterface>();
    }
}

export default FetchFeaturedGames;

import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { FeaturedGamesInterface } from '../../interfaces/dto';

class GetFeaturedGames extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.FEATURED;
    }

    public async exec(): Promise<FeaturedGamesInterface> {
        return this.run<FeaturedGamesInterface>();
    }
}

export default GetFeaturedGames;

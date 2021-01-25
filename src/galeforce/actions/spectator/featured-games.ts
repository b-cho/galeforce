import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { FeaturedGamesInterface } from '../../interfaces/dto';
import { TakesRegion } from '../mixins';

const BaseAction = TakesRegion<LeagueRegion>(Action);

export class GetFeaturedGames extends BaseAction<FeaturedGamesInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.FEATURED;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

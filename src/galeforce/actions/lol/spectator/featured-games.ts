import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { FeaturedGamesDTO } from '../../../interfaces/dto';
import { TakesRegion } from '../../mixins';

const BaseAction = TakesRegion({} as LeagueRegion, Action);

export default class GetFeaturedGames extends BaseAction<FeaturedGamesDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.FEATURED;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ChampionMasteryDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesRegion, TakesSummonerId } from '../../mixins';

const BaseAction = TakesSummonerId(
    TakesRegion(
        {} as LeagueRegion,
        Action,
    ),
);

export default class GetMasteryList extends BaseAction<ChampionMasteryDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.LIST;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

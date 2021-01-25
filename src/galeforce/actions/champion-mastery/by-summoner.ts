import { Action } from '../action';
import { ChampionMasteryInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesRegion, TakesSummonerId } from '../mixins';

const BaseAction = TakesSummonerId(
    TakesRegion<LeagueRegion>(
        Action,
    ),
);

export class GetMasteryList extends BaseAction<ChampionMasteryInterface[]> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

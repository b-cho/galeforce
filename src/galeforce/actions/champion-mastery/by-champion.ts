import { Action } from '../action';
import { ChampionMasteryInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesChampionId, TakesRegion, TakesSummonerId } from '../mixins';

const BaseAction = TakesSummonerId(
    TakesChampionId(
        TakesRegion({} as LeagueRegion,
            Action),
    ),
);

export class GetMasteryByChampion extends BaseAction<ChampionMasteryInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.CHAMPION;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

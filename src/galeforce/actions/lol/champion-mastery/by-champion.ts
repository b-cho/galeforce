import Action from '../../action';
import { ChampionMasteryDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesChampionId, TakesRegion, TakesSummonerId } from '../../mixins';

const BaseAction = TakesSummonerId(
    TakesChampionId(
        TakesRegion({} as LeagueRegion,
            Action),
    ),
);

export default class GetMasteryByChampion extends BaseAction<ChampionMasteryDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.CHAMPION;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

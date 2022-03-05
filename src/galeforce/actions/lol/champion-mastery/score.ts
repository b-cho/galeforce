import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesRegion, TakesSummonerId } from '../../mixins';

const BaseAction = TakesSummonerId(
    TakesRegion(
        {} as LeagueRegion,
        Action,
    ),
);

export default class GetMasteryScore extends BaseAction<number> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SCORE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

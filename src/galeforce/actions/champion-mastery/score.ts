import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesRegion, TakesSummonerId } from '../mixins';

const BaseAction =
TakesSummonerId(
    TakesRegion<LeagueRegion>(
        Action));

export class GetMasteryScore extends BaseAction<number> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SCORE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}
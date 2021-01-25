import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { CurrentGameInfoInterface } from '../../interfaces/dto';
import { TakesRegion, TakesSummonerId } from '../mixins';

const BaseAction = TakesSummonerId(
    TakesRegion({} as LeagueRegion,
        Action),
);

export class GetCurrentGameInfo extends BaseAction<CurrentGameInfoInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.SUMMONER_ID;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

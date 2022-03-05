import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { CurrentGameInfoDTO } from '../../../interfaces/dto';
import { TakesRegion, TakesSummonerId } from '../../mixins';

const BaseAction = TakesSummonerId(
    TakesRegion(
        {} as LeagueRegion,
        Action,
    ),
);

export default class GetCurrentGameInfo extends BaseAction<CurrentGameInfoDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.SUMMONER_ID;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

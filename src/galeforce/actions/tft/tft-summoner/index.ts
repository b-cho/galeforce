import Action from '../../action';
import { SummonerDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRegion(
        {} as LeagueRegion,
        Action,
    ),
);

export default class GetTFTSummoner extends BaseAction<SummonerDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TFT_SUMMONER.PUUID;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

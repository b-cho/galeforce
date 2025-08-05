import Action from '../../action';
import { TopRatedLadderEntryDTO } from '../../../interfaces/dto';
import {
    ENDPOINTS, LeagueRegion, TFTQueue
} from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesRegion, TakesQueue } from '../../mixins';

const BaseAction = TakesQueue(
    {} as TFTQueue,
    TakesRegion(
        {} as LeagueRegion,
        Action
    )
);

export default class GetTFTTopRatedLadderEntries extends BaseAction<TopRatedLadderEntryDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TFT_LEAGUE.RATED_LADDERS_TOP;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

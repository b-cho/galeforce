import Action from '../../action';
import { ChampionMasteryDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesRegion, TakesPUUID, TakesQuery } from '../../mixins';

type TopQuery = {
    count?: number;
}

const BaseAction = TakesQuery(
    {} as TopQuery,
    TakesPUUID(
        TakesRegion(
            {} as LeagueRegion,
            Action,
        ),
    )
);

export default class GetMasteryTop extends BaseAction<ChampionMasteryDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.TOP;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentRegistrationParameters } from '../../../interfaces/parameters';
import { TakesBody, TakesRegion } from '../../mixins';

const BaseAction = TakesBody({} as TournamentRegistrationParameters,
    TakesRegion({} as LeagueRegion,
        Action));

export default class PostTournaments extends BaseAction<number> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.TOURNAMENTS;
        this.payload.type = 'lol';
        this.payload.method = 'POST';
    }
}

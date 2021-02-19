import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentCodeDTO } from '../../../interfaces/dto';
import { TakesRegion, TakesTournamentCode } from '../../mixins';

const BaseAction = TakesTournamentCode(
    TakesRegion({} as LeagueRegion,
        Action),
);

export default class GetTournamentCodes extends BaseAction<TournamentCodeDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.BY_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }
}

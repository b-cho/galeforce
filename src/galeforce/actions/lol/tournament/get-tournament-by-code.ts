import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentCodeDTO } from '../../../interfaces/dto';
import { TakesRegion, TakesTournamentCode } from '../../mixins';

const BaseAction = TakesTournamentCode(
    TakesRegion(
        {} as RiotRegion,
        Action,
    ),
);

export default class GetTournamentCodes extends BaseAction<TournamentCodeDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.BY_CODE;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

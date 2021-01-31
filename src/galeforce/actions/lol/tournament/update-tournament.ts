import Action from '../../action';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentCodeUpdateParameters } from '../../../interfaces/parameters';
import { TakesBody, TakesRegion, TakesTournamentCode } from '../../mixins';

const BaseAction = TakesBody({} as TournamentCodeUpdateParameters,
    TakesTournamentCode(
        TakesRegion({} as LeagueRegion,
            Action),
    ));

export default class PutTournamentCodes extends BaseAction<void> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.CODES.BY_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'PUT';
    }
}

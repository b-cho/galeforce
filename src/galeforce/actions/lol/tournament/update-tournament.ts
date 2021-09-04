import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentCodeUpdateParameters } from '../../../interfaces/parameters';
import { TakesBody, TakesRegion, TakesTournamentCode } from '../../mixins';

const BaseAction = TakesBody({} as TournamentCodeUpdateParameters,
    TakesTournamentCode(
        TakesRegion({} as RiotRegion,
            Action),
    ));

export default class PutTournamentCodes extends BaseAction<void> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.BY_CODE;
        this.payload.type = 'riot';
        this.payload.method = 'PUT';
    }
}

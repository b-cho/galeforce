import { Action } from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TournamentCodeUpdateParameters } from '../../interfaces/parameters';
import { TakesBody, TakesRegion, TakesTournamentCode } from '../mixins';

const BaseAction = TakesBody({} as TournamentCodeUpdateParameters,
    TakesTournamentCode(
        TakesRegion({} as LeagueRegion,
            Action),
    ));

export class PutTournamentCodes extends BaseAction<void> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.CODES.BY_CODE;
        this.payload.type = 'lol';
        this.payload.method = 'PUT';
    }
}

import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentGameDTO } from '../../../interfaces/dto';
import { TakesTournamentCode, TakesRegion } from '../../mixins';

const BaseAction = TakesTournamentCode(
    TakesRegion(
        {} as RiotRegion,
        Action,
    ),
);

export default class GetTournamentGames extends BaseAction<TournamentGameDTO[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.GAMES;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}

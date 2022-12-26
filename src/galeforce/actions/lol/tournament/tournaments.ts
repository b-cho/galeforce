import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentRegistrationParameters } from '../../../interfaces/parameters';
import { TakesBody, TakesRegion } from '../../mixins';

const BaseAction = TakesBody(
    {} as TournamentRegistrationParameters,
    TakesRegion(
        {} as RiotRegion,
        Action,
    ),
);

export default class PostTournaments extends BaseAction<number> {
    constructor(submodules: SubmoduleMap, stub: boolean) {
        super(submodules);
        this.payload.endpoint = stub ? ENDPOINTS.TOURNAMENT_STUB.TOURNAMENTS : ENDPOINTS.TOURNAMENT.TOURNAMENTS;
        this.payload.type = 'riot';
        this.payload.method = 'POST';
    }
}

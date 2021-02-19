import Action from '../../action';
import { MatchDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion, TakesTournamentCode } from '../../mixins';

const BaseAction = TakesMatchId(
    TakesTournamentCode(
        TakesRegion({} as LeagueRegion,
            Action),
    ),
);

export default class GetMatch extends BaseAction<MatchDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<MatchDTO> {
        if (this.payload.tournamentCode) {
            this.payload.endpoint = ENDPOINTS.MATCH.MATCH_ID_TOURNAMENT;
        } else {
            this.payload.endpoint = ENDPOINTS.MATCH.MATCH_ID;
        }

        return super.exec();
    }
}

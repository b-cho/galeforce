import { Action } from '../action';
import { MatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion, TakesTournamentCode } from '../mixins';

const BaseAction = TakesMatchId(
    TakesTournamentCode(
        TakesRegion<LeagueRegion>(
            Action)));

export class GetMatch extends BaseAction<MatchInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<MatchInterface> {
        if (this.payload.tournamentCode) {
            this.payload.endpoint = ENDPOINTS.MATCH.MATCH.MATCH_ID_TOURNAMENT;
        } else {
            this.payload.endpoint = ENDPOINTS.MATCH.MATCH.MATCH_ID;
        }

        return super.exec();
    }
}

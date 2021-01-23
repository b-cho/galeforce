import Action from '../action';
import { MatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetMatch extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCH.MATCH_ID;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public matchId(matchId: number): this {
        this.payload.matchId = matchId;
        return this;
    }

    public tournamentCode(tournamentCode: string): this {
        this.payload.endpoint = ENDPOINTS.MATCH.MATCH.MATCH_ID_TOURNAMENT;
        this.payload.tournamentCode = tournamentCode;
        return this;
    }

    public async exec(): Promise<MatchInterface> {
        return this.run<MatchInterface>();
    }
}

export default GetMatch;

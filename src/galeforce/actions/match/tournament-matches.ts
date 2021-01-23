import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetTournamentMatches extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCH.TOURNAMENT_CODE;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public tournamentCode(tournamentCode: string): this {
        this.payload.tournamentCode = tournamentCode;
        return this;
    }

    public async exec(): Promise<number[]> {
        return this.run<number[]>();
    }
}

export default GetTournamentMatches;

import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetMatchesByTournamentCode extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.MATCH.MATCH.TOURNAMENT_CODE);
    }

    public tournamentCode(tournamentCode: string): this {
        this.payload.setTournamentCode(tournamentCode);
        return this;
    }

    public async exec(): Promise<number[]> {
        return this.run<number[]>();
    }
}

export default GetMatchesByTournamentCode;

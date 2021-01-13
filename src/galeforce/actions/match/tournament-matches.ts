import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchesByTournamentCode extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.MATCH.MATCH.TOURNAMENT_CODE);
    }

    public tournamentCode: (tournamentCode: string) => this = super.setTournamentCode;

    public async exec(): Promise<number[]> {
        return this.run<number[]>();
    }
}

export default FetchMatchesByTournamentCode;

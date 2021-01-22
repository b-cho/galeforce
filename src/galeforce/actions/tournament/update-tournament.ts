import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentCodeUpdateParameters } from '../../interfaces/parameters';

class PutTournamentCodes extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.TOURNAMENT.CODES.BY_CODE);
    }

    public tournamentCode(tournamentCode: string): this {
        this.payload.setTournamentCode(tournamentCode);
        return this;
    }

    public body(body: TournamentCodeUpdateParameters): this {
        this.payload.setBody(body);
        return this;
    }

    public async exec(): Promise<void> {
        return this.run<void>('PUT');
    }
}

export default PutTournamentCodes;

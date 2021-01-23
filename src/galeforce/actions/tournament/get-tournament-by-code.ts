import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentCodeInterface } from '../../interfaces/dto';

class GetTournamentCodes extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.CODES.BY_CODE;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public tournamentCode(tournamentCode: string): this {
        this.payload.tournamentCode = tournamentCode;
        return this;
    }

    public async exec(): Promise<TournamentCodeInterface> {
        return this.run<TournamentCodeInterface>();
    }
}

export default GetTournamentCodes;

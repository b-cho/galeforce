import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentInterface } from '../../interfaces/dto';

class GetUpcomingClashTournaments extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.ALL;
    }

    public async exec(): Promise<TournamentInterface[]> {
        return this.run<TournamentInterface[]>();
    }
}

export default GetUpcomingClashTournaments;

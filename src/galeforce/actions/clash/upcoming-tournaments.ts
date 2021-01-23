import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentInterface } from '../../interfaces/dto';

class GetUpcomingClashTournaments extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.TOURNAMENTS.ALL;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public async exec(): Promise<TournamentInterface[]> {
        return this.run<TournamentInterface[]>();
    }
}

export default GetUpcomingClashTournaments;

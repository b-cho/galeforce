import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentRegistrationParameters } from '../../interfaces/parameters';

class PostTournaments extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.TOURNAMENTS;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public body(body: TournamentRegistrationParameters): this {
        this.payload.body = body;
        return this;
    }

    public async exec(): Promise<number> {
        return this.run<number>('POST');
    }
}

export default PostTournaments;

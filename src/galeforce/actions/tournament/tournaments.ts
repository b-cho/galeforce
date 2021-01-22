import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentRegistrationParameters } from '../../interfaces/parameters';

class PostTournaments extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.TOURNAMENT.TOURNAMENTS);
    }

    public body(body: TournamentRegistrationParameters): this {
        this.payload.setBody(body);
        return this;
    }

    public async exec(): Promise<number> {
        return this.run<number>('POST');
    }
}

export default PostTournaments;

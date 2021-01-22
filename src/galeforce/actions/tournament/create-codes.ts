import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentCodeParameters } from '../../interfaces/parameters';

class PostTournamentCodes extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.CODES.CREATE;
    }

    public body(body: TournamentCodeParameters): this {
        this.payload.body = body;
        return this;
    }

    public async exec(): Promise<string[]> {
        return this.run<string[]>('POST');
    }
}

export default PostTournamentCodes;

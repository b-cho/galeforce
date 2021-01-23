import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { TournamentCodeParameters } from '../../interfaces/parameters';

type PostTournamentCodesQuery = {
    count?: number;
    tournamentId: number;
}

class PostTournamentCodes extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.CODES.CREATE;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public body(body: TournamentCodeParameters): this {
        this.payload.body = body;
        return this;
    }

    public query(query: PostTournamentCodesQuery): this {
        this.payload.query = query;
        return this;
    }

    public async exec(): Promise<string[]> {
        if (!this.payload.query || !Object.keys(this.payload.query).includes('tournamentId')) {
            throw new Error('[galeforce]: POST to /lol/tournament/v4/codes requires a query with a tournamentId parameter.');
        }
        return this.run<string[]>('POST');
    }
}

export default PostTournamentCodes;

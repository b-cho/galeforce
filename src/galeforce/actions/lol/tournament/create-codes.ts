import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TournamentCodeParameters } from '../../../interfaces/parameters';
import { TakesBody, TakesQuery, TakesRegion } from '../../mixins';

type PostTournamentCodesQuery = {
    count?: number;
    tournamentId: number;
}

const BaseAction = TakesBody(
    {} as TournamentCodeParameters,
    TakesQuery(
        {} as PostTournamentCodesQuery,
        TakesRegion(
            {} as RiotRegion,
            Action,
        ),
    ),
);

export default class PostTournamentCodes extends BaseAction<string[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.TOURNAMENT.CREATE_CODE;
        this.payload.type = 'riot';
        this.payload.method = 'POST';
    }

    public async exec(): Promise<string[]> {
        if (!this.payload.query || !Object.keys(this.payload.query).includes('tournamentId')) {
            throw new Error('[galeforce]: POST to /lol/tournament/v4/codes requires a query with a tournamentId parameter.');
        }
        return super.exec();
    }
}

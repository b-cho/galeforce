import Action from '../../action';
import { SummonerDTO } from '../../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import {
    TakesAccountId, TakesPUUID, TakesRegion, TakesSummonerId, TakesSummonerName,
} from '../../mixins';

const BaseAction = TakesSummonerName(
    TakesSummonerId(
        TakesAccountId(
            TakesPUUID(
                TakesRegion({} as LeagueRegion,
                    Action),
            ),
        ),
    ),
);

export default class GetSummoner extends BaseAction<SummonerDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        if (typeof this.payload.summonerName !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_NAME;
        } else if (typeof this.payload.summonerId !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.SUMMONER.SUMMONER_ID;
        } else if (typeof this.payload.accountId !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.SUMMONER.ACCOUNT_ID;
        } else if (typeof this.payload.puuid !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.SUMMONER.PUUID;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
    }
}

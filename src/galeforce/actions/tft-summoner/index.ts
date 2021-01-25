import { Action } from '../action';
import { SummonerInterface } from '../../interfaces/dto';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesSummonerName, TakesSummonerId, TakesAccountId, TakesPUUID, TakesRegion } from '../mixins';

const BaseAction =
TakesSummonerName(
    TakesSummonerId(
        TakesAccountId(
            TakesPUUID(
                TakesRegion<LeagueRegion>(
                    Action)))));

export class GetTFTSummoner extends BaseAction<SummonerInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<SummonerInterface> {
        if(this.payload.summonerName) {
            this.payload.endpoint = ENDPOINTS.TFT_SUMMONER.SUMMONER_NAME;
        } else if (this.payload.summonerId) {
            this.payload.endpoint = ENDPOINTS.TFT_SUMMONER.SUMMONER_ID;
        } else if (this.payload.accountId) {
            this.payload.endpoint = ENDPOINTS.TFT_SUMMONER.ACCOUNT_ID;
        } else if (this.payload.puuid) {
            this.payload.endpoint = ENDPOINTS.TFT_SUMMONER.PUUID;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }

        return super.exec();
    }
}

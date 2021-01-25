import { Action } from '../action';
import { AccountInterface } from '../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import { SubmoduleMapInterface } from '../../interfaces/submodule-map';
import { TakesPUUID, TakesRiotId, TakesRegion } from '../mixins';

const BaseAction = TakesPUUID(
    TakesRiotId(
        TakesRegion({} as RiotRegion,
            Action),
    ),
);

export class GetAccount extends BaseAction<AccountInterface> {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.ACCOUNT.PUUID;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<AccountInterface> {
        if (this.payload.puuid) {
            this.payload.endpoint = ENDPOINTS.ACCOUNT.PUUID;
        } else if (this.payload.gameName || this.payload.tagLine) {
            this.payload.endpoint = ENDPOINTS.ACCOUNT.RIOT_ID;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }

        return super.exec();
    }
}

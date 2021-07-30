import Action from '../../action';
import { AccountDTO } from '../../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesRiotId, TakesRegion } from '../../mixins';

const BaseAction = TakesPUUID(
    TakesRiotId(
        TakesRegion({} as RiotRegion,
            Action),
    ),
);

export default class GetAccount extends BaseAction<AccountDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.ACCOUNT.PUUID;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }

    protected inferEndpoint(): void {
        if (typeof this.payload.puuid !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.ACCOUNT.PUUID;
        } else if (typeof this.payload.gameName !== 'undefined' || typeof this.payload.tagLine !== 'undefined') {
            this.payload.endpoint = ENDPOINTS.ACCOUNT.RIOT_ID;
        } else {
            throw new Error('[galeforce]: Not enough parameters provided to select API endpoint.');
        }
    }
}

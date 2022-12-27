import Action from '../../action';
import { ENDPOINTS, LeagueRegion, Tier } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { ApexPlayerInfoDTO } from '../../../interfaces/dto';
import { TakesChallengeId, TakesRegion, TakesTier } from '../../mixins';

const BaseAction = TakesTier(
    TakesChallengeId(
        TakesRegion({} as LeagueRegion, Action),
    ),
);

export default class GetChallengeLeaderboard extends BaseAction<ApexPlayerInfoDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.type = 'lol';
        this.payload.method = 'GET';
    }

    public async exec(): Promise<ApexPlayerInfoDTO> {
        if (typeof this.payload.tier !== 'undefined' && [Tier.MASTER, Tier.GRANDMASTER, Tier.CHALLENGER].includes(this.payload.tier)) {
            // set to experimental endpoint for support
            this.payload.endpoint = ENDPOINTS.CHALLENGES.LEADERBOARD;
        } else {
            throw new Error('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.');
        }

        return super.exec();
    }
}

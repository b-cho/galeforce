import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMasteryScoreBySummonerID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.CHAMPION_MASTERY.SCORE);
    }

    public summonerId: (summonerId: string) => this = super.setSummonerId;

    public async exec(): Promise<number> {
        return this.run<number>();
    }
}

export default FetchMasteryScoreBySummonerID;

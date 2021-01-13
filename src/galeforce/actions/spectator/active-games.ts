import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { CurrentGameInfoInterface } from '../../interfaces/dto';

class FetchCurrentGameInfoBySummonerID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.SPECTATOR.SUMMONER_ID);
    }

    public summonerId(summonerId: string): this {
        this.payload.setSummonerId(summonerId);
        return this;
    }

    public async exec(): Promise<CurrentGameInfoInterface> {
        return this.run<CurrentGameInfoInterface>();
    }
}

export default FetchCurrentGameInfoBySummonerID;

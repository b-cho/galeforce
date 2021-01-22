import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { CurrentGameInfoInterface } from '../../interfaces/dto';

class GetCurrentGameInfo extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.SUMMONER_ID;
    }

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<CurrentGameInfoInterface> {
        return this.run<CurrentGameInfoInterface>();
    }
}

export default GetCurrentGameInfo;

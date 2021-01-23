import Action from '../action';
import { ENDPOINTS, LeagueRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';
import { CurrentGameInfoInterface } from '../../interfaces/dto';

class GetCurrentGameInfo extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.SPECTATOR.SUMMONER_ID;
        this.payload.type = 'lol';
    }

    public region: (region: LeagueRegion) => this = super.region;

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<CurrentGameInfoInterface> {
        return this.run<CurrentGameInfoInterface>();
    }
}

export default GetCurrentGameInfo;

import Action from '../action';
import { PlayerInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetClashPlayers extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CLASH.PLAYERS;
    }

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<PlayerInterface[]> {
        return this.run<PlayerInterface[]>();
    }
}

export default GetClashPlayers;

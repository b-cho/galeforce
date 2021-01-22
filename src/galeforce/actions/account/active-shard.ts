import Action from '../action';
import { ActiveShardInterface } from '../../interfaces/dto';
import { ENDPOINTS, Game } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetActiveShard extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.ACCOUNT.ACTIVE_SHARDS; // set action endpoint simultaneously
    }

    public puuid(puuid: string): this {
        this.payload.puuid = puuid;
        return this;
    }

    public game(game: Game): this {
        this.payload.game = game;
        return this;
    }

    public async exec(): Promise<ActiveShardInterface> {
        return this.run<ActiveShardInterface>();
    }
}

export default GetActiveShard;

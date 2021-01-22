/*
    The GetSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { ActiveShardInterface } from '../../interfaces/dto';
import { ENDPOINTS, Game } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetActiveShard extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.ACCOUNT.ACTIVE_SHARDS); // set action endpoint simultaneously
    }

    public puuid(puuid: string): this {
        this.payload.setPuuid(puuid);
        return this;
    };

    public game(game: Game): this {
        this.payload.setGame(game);
        return this;
    }

    public async exec(): Promise<ActiveShardInterface> {
        return this.run<ActiveShardInterface>();
    }
}

export default GetActiveShard;

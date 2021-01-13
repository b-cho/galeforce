/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { PlayerInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchClashPlayersBySummonerID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.setEndpoint(ENDPOINTS.CLASH.PLAYERS);
    }

    public summonerId: (summonerId: string) => this = super.setSummonerId;

    public async exec(): Promise<PlayerInterface[]> {
        return this.run<PlayerInterface[]>();
    }
}

export default FetchClashPlayersBySummonerID;

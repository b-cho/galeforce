/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { ChampionMasteryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMasteryBySummonerID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST;
    }

    public region: (region: Region) => this = super.region;

    public summonerId: (summonerId: string) => this = super.summonerId;

    public async exec(): Promise<ChampionMasteryInterface[]> {
        return this.run<ChampionMasteryInterface[]>();
    }
}

export default FetchMasteryBySummonerID;

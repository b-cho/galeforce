/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { SummonerInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchSummonerByName extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, server: Region, summonerName: string) {
        super(SubmoduleMap, server);

        this.summonerName = summonerName;
    }

    public async exec(): Promise<SummonerInterface> {
        return await this.run<SummonerInterface>(ENDPOINTS.SUMMONER.SUMMONER_NAME, { server: this.server, 'summoner-name': this.summonerName });
    }
}

export default FetchSummonerByName;

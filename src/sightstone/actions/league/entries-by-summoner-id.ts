/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchLeagueEntriesBySummonerID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, server: Region, summonerId: string) {
        super(SubmoduleMap, server);

        this.summonerId = summonerId;
    }

    public async exec(): Promise<LeagueEntryInterface> {
        return await this.run<LeagueEntryInterface>(ENDPOINTS.LEAGUE.SUMMONER_ID, { server: this.server, 'summoner-id': this.summonerId });
    }
}

export default FetchLeagueEntriesBySummonerID;

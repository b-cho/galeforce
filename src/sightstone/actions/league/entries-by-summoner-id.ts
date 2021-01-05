/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchLeagueEntriesBySummonerID extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface, region: Region, summonerId: string) {
        super(SubmoduleMap, region);

        this.summonerId = summonerId;
    }

    public async exec(): Promise<LeagueEntryInterface[]> {
        return this.run<LeagueEntryInterface[]>(ENDPOINTS.LEAGUE.SUMMONER_ID, { server: this.region, 'summoner-id': this.summonerId });
    }
}

export default FetchLeagueEntriesBySummonerID;

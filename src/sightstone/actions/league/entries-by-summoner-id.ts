/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { LeagueEntryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchLeagueEntriesBySummonerID extends Action {
    private server: Region;

    private summonerId: string;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: string, summonerId: string) {
        super(SubmoduleMap);
        // Region check
        if (!(<any>Object).values(Region).includes(server.toLowerCase())) {
            throw new Error('[sightstone]: Invalid server region provided.');
        }
        
        this.server = server as Region; // We've already performed a type check
        this.summonerId = summonerId;
    }

    public async run(): Promise<LeagueEntryInterface> {
        try {
            await this.waitForRateLimit(this.server);
            await this.incrementRateLimit(this.server);
            const { data: leagueEntryData }: any = await this.RiotAPI.request(ENDPOINTS.LEAGUE.SUMMONER_ID, { server: this.server, 'summoner-id': this.summonerId }).get();

            return leagueEntryData as LeagueEntryInterface;
        } catch (e) {
            if (e.response?.status) {
                if (e.response.status === 403) {
                    throw new Error('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                } else {
                    throw new Error(`[sightstone]: LeagueEntries data fetch failed with status code ${e.response.status}`);
                }
            }

            throw e;
        }
    }
}

export default FetchLeagueEntriesBySummonerID;

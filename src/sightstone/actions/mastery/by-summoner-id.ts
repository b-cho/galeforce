/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { ChampionMasteryInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMasteryBySummonerID extends Action {
    private server: string;

    private summonerId: string;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: string, summonerId: string) {
        super(SubmoduleMap);
        this.server = server;
        this.summonerId = summonerId;
    }

    public async run(): Promise<ChampionMasteryInterface> {
        try {
            // Region check
            if (!(<any>Object).values(Region).includes(this.server.toLowerCase())) {
                throw new Error('Invalid server region provided.');
            }

            await this.waitForRateLimit();
            await this.incrementRateLimit();
            const { data: masteryData }: any = await this.RiotAPI.request(ENDPOINTS.CHAMPION_MASTERY.SUMMONER_ID.LIST, { server: this.server, 'summoner-id': this.summonerId }).get();
            return masteryData as ChampionMasteryInterface;
        } catch (e) {
            if (e.response?.status) {
                console.error(`[sightstone]: ChampionMastery data fetch failed with status code ${e.response.status}`);
                if (e.response.status === 403) {
                    throw new Error(`
                        [sightstone]: The provided Riot API key is invalid
                        or has expired. Please verify its authenticity. (sc-403)
                    `);
                }
            } else {
                console.error(`[sightstone]: ChampionMastery data fetch failed with error ${e.name || ''}.`);
            }

            throw e;
        }
    }
}

export default FetchMasteryBySummonerID;

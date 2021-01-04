/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { SummonerInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchSummonerByName extends Action {
    private server: string;

    private name: string;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: string, name: string) {
        super(SubmoduleMap);
        // Region check
        if (!(<any>Object).values(Region).includes(server.toLowerCase())) {
            throw new Error('[sightstone]: Invalid server region provided.');
        }

        this.server = server;
        this.name = name;
    }

    public async run(): Promise<SummonerInterface> {
        try {
            // TODO: Fix the typing of summonerData (maybe through another interface?)
            await this.waitForRateLimit();
            await this.incrementRateLimit();
            const { data: summonerData }: any = await this.RiotAPI.request(ENDPOINTS.SUMMONER.SUMMONER_NAME, { server: this.server, 'summoner-name': this.name }).get();

            return summonerData as SummonerInterface;
        } catch (e) {
            if (e.response?.status) {
                if (e.response.status === 403) {
                    throw new Error('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                } else {
                    throw new Error(`[sightstone]: Summoner data fetch failed with status code ${e.response.status}`);
                }
            }

            throw e;
        }
    }
}

export default FetchSummonerByName;

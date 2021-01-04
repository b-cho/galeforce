/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchByMatchID extends Action {
    private server: string;

    private matchId: number;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: string, matchId: number) {
        super(SubmoduleMap);
        // Region check
        if (!(<any>Object).values(Region).includes(server.toLowerCase())) {
            throw new Error('[sightstone]: Invalid server region provided.');
        }
        
        this.server = server;
        this.matchId = matchId;
    }

    public async run(): Promise<MatchInterface> {
        try {
            await this.waitForRateLimit();
            await this.incrementRateLimit();
            const { data: matchData }: any = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCH.MATCH_ID, { server: this.server, 'match-id': this.matchId }).get();

            return matchData as MatchInterface;
        } catch (e) {
            if (e.response?.status) {
                if (e.response.status === 403) {
                    throw new Error('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                } else {
                    throw new Error(`[sightstone]: Match data fetch failed with status code ${e.response.status}`);
                }
            }

            throw e;
        }
    }
}

export default FetchMatchByMatchID;

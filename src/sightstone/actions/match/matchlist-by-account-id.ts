/*
    The FetchSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { MatchlistInterface } from '../../interfaces/dto';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchMatchlistByAccountID extends Action {
    private server: string;

    private accountId: string;

    private endIndex: number | undefined;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: string, accountId: string, endIndex?: number) {
        super(SubmoduleMap);
        this.server = server;
        this.accountId = accountId;
        this.endIndex = endIndex;
    }

    public async run(): Promise<MatchlistInterface> {
        try {
            // Region check
            if (!(<any>Object).values(Region).includes(this.server.toLowerCase())) {
                throw new Error('Invalid server region provided.');
            }

            await this.waitForRateLimit();
            await this.incrementRateLimit();
            if (typeof this.endIndex === 'number') {
                const { data: matchlistData }: any = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID_INDEX, { server: this.server, 'account-id': this.accountId, 'end-index': this.endIndex }).get();
                return matchlistData as MatchlistInterface;
            } else {
                const { data: matchlistData }: any = await this.RiotAPI.request(ENDPOINTS.MATCH.MATCHLIST.ACCOUNT_ID, { server: this.server, 'account-id': this.accountId }).get();
                return matchlistData as MatchlistInterface;
            }

        } catch (e) {
            if (e.response?.status) {
                console.error(`[sightstone]: Matchlist data fetch failed with status code ${e.response.status}`);
                if (e.response.status === 403) {
                    throw new Error(`
                        [sightstone]: The provided Riot API key is invalid
                        or has expired. Please verify its authenticity. (sc-403)
                    `);
                }
            } else {
                console.error(`[sightstone]: Matchlist data fetch failed with error ${e.name || ''}.`);
            }

            throw e;
        }
    }
}

export default FetchMatchlistByAccountID;

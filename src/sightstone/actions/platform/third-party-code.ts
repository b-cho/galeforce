import Action from '../action';
import { ENDPOINTS, Region } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class FetchThirdPartyCodeBySummonerId extends Action {
    private summonerId: string;

    private server: Region;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: string, summonerId: string) {
        super(SubmoduleMap);
        // Region check
        if (!(<any>Object).values(Region).includes(server.toLowerCase())) {
            throw new Error('[sightstone]: Invalid server region provided.');
        }

        this.server = server as Region; // We've already performed a type check
        this.summonerId = summonerId;
    }

    public async run(): Promise<string> {
        try {
            await this.waitForRateLimit(this.server);
            await this.incrementRateLimit(this.server);

            // We convert TPCData to a string because we can guarantee the result is of type string (as detailed by the Riot API docs).
            const { data: TPCData }: any = await this.RiotAPI.request(ENDPOINTS.PLATFORM.THIRD_PARTY_CODE.SUMMONER_ID, { server: this.server, 'summoner-id': this.summonerId }).get();
            return TPCData as string;
        } catch (e) {
            if (e.response?.status) {
                if (e.response.status === 403) {
                    throw new Error('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                } else {
                    throw new Error(`[sightstone]: ThirdPartyCode data fetch failed with status code ${e.response.status}`);
                }
            }

            throw e;
        }
    }
}

export default FetchThirdPartyCodeBySummonerId;

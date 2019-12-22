/*
    The main RiotAPI object.
*/

import RiotAPIInternal from "./internal/internal";
import RiotAPIRequest from "./requests/riot-api-request";

class RiotAPI {
    private key: string;
    public internal: RiotAPIInternal;

    constructor(key: string) {
        this.key = key;
        this.internal = new RiotAPIInternal();
    }
    
    public request(stringTemplate: string, parameters: object): RiotAPIRequest {
        return new RiotAPIRequest(stringTemplate, parameters, this.key);
    }

    public async init(): Promise<void> {
        await this.internal.init();
    }
}

export default RiotAPI;
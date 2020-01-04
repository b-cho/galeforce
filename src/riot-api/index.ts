/*
    The main RiotAPI object.
*/

import RiotAPIInternal from './internal/internal';
import RiotAPIRequest from './requests/riot-api-request';
import ENDPOINTS from './enums/endpoints';
import REGIONS from './enums/regions';
import Cache from '../sightstone/caches/cache';

class RiotAPIModule {
    private key: string;

    public internal: RiotAPIInternal;

    constructor(key: string, version: string) {
        this.key = key;
        this.internal = new RiotAPIInternal(version);
    }

    public request(stringTemplate: string, parameters: object): RiotAPIRequest {
        return new RiotAPIRequest(stringTemplate, parameters, this.key);
    }

    public async init(): Promise<void> {
        await this.internal.init();
    }
}

export { ENDPOINTS, REGIONS };
export default RiotAPIModule;

/*
    The main RiotAPI object.
*/

import RiotAPIRequest from './requests/riot-api-request';
import ENDPOINTS from './enums/endpoints';
import Region from './enums/regions';
import Queue from './enums/queues';
import Tier from './enums/tiers';
import Division from './enums/divisions';
import DataDragonRequest from './requests/data-dragon-request';

export default class RiotAPIModule {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    public request(stringTemplate: string, parameters: { [key: string]: unknown }, query?: { [key: string]: unknown }): RiotAPIRequest {
        return new RiotAPIRequest(stringTemplate, parameters, this.key, query || {});
    }

    public dataDragonRequest(stringTemplate: string, version: string): DataDragonRequest {
        return new DataDragonRequest(stringTemplate, version);
    }
}

export { ENDPOINTS, Region, Queue, Tier, Division };

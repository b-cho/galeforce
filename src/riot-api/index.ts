/*
    The main RiotAPI object.
*/

import RiotAPIRequest from './requests/riot-api-request';
import ENDPOINTS from './enums/endpoints';
import Region from './enums/regions';
import DataDragonRequest from './requests/data-dragon-request';

export default class RiotAPIModule {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    public request(stringTemplate: string, parameters: { [key: string]: unknown }): RiotAPIRequest {
        return new RiotAPIRequest(stringTemplate, parameters, this.key);
    }

    public dataDragonRequest(stringTemplate: string, version: string): DataDragonRequest {
        return new DataDragonRequest(stringTemplate, version);
    }
}

export { ENDPOINTS, Region };

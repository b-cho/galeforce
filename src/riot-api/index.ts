/*
    The main RiotAPI object.
*/

import RiotAPIRequest from './requests/riot-api-request';
import * as ENDPOINTS from './enums/endpoints';
import { Region, LeagueRegion, RiotRegion, ValorantRegion } from './enums/regions';
import { Queue, LeagueQueue, ValorantQueue} from './enums/queues';
import Tier from './enums/tiers';
import Division from './enums/divisions';
import DataDragonRequest from './requests/data-dragon-request';
import Game from './enums/games';

export default class RiotAPIModule {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    public request(stringTemplate: string, parameters: { [key: string]: unknown }, query?: object, body?: object): RiotAPIRequest {
        return new RiotAPIRequest(stringTemplate, parameters, this.key, query || {}, body || {});
    }

    public dataDragonRequest(stringTemplate: string, version: string): DataDragonRequest {
        return new DataDragonRequest(stringTemplate, version);
    }
}

export {
    ENDPOINTS, Region, LeagueRegion, RiotRegion, ValorantRegion, Queue, LeagueQueue, ValorantQueue, Tier, Division, Game,
};

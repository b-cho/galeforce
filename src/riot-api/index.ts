/*
    The main RiotAPI object.
*/

import RiotAPIRequest from './requests/riot-api-request';
import * as ENDPOINTS from './enums/endpoints';
import {
    Region, LeagueRegion, RiotRegion, ValorantRegion, DataDragonRegion,
} from './enums/regions';
import { Queue, LeagueQueue, ValorantQueue } from './enums/queues';
import { Tier } from './enums/tiers';
import { Division } from './enums/divisions';
import { Game } from './enums/games';
import GameClientRequest from './requests/game-client-request';
import BufferRequest from './requests/buffer-request';

export class RiotAPIModule {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    public request(stringTemplate: string, parameters: Record<string, unknown>, query?: object, body?: object): RiotAPIRequest {
        return new RiotAPIRequest(this.key, stringTemplate, parameters, query || {}, body || {});
    }

    public gcRequest(stringTemplate: string, parameters: Record<string, unknown>, query?: object, body?: object): GameClientRequest {
        return new GameClientRequest(stringTemplate, parameters, query || {}, body || {});
    }

    public bufferRequest(stringTemplate: string, parameters: Record<string, unknown>, query?: object, body?: object): BufferRequest {
        return new BufferRequest(stringTemplate, parameters, query || {}, body || {});
    }
}

export {
    ENDPOINTS, Region, LeagueRegion, RiotRegion, ValorantRegion, DataDragonRegion,
    Queue, LeagueQueue, ValorantQueue, Tier, Division, Game,
};

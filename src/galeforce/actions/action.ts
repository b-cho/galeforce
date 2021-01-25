/**
    The base Action class that all other composite actions should
    inherit from.
    @packageDocumentation
*/

import async from 'async';
import { RiotAPIModule, Region } from '../../riot-api';
import { Payload, CreatePayloadProxy } from './payload';
import { Cache } from '../caches/cache';
import { SubmoduleMapInterface } from '../interfaces/submodule-map';

/**
 * @template T The type/enum corresponding to the valid endpoint regions.
 * @template R The return type of the Action.
 */
export class Action<R> {
    protected RiotAPI: RiotAPIModule;

    protected cache: Cache;

    protected SubmoduleMap: SubmoduleMapInterface;

    public payload: Payload;

    /**
     * 
     * @param SubmoduleMap
     * @param payload The mutable payload object that is passed to {@link Request} when `.exec()` is called.
     */
    constructor(SubmoduleMap: SubmoduleMapInterface, payload?: Payload) {
        this.SubmoduleMap = SubmoduleMap;
        this.RiotAPI = SubmoduleMap.RiotAPI;
        this.cache = SubmoduleMap.cache;

        this.payload = payload || CreatePayloadProxy({});
    }

    /**
     * Executes the action, sending an HTTP request to the Riot API servers
     * and retrieving the associated data from the appropriate endpoint.
     * @throws Will throw an error if a required payload value (*region*,
     * *body* on POST or PUT requests, etc.) is missing or the HTTP request
     * fails with an error.
     */
    public async exec(): Promise<R> {
        try {
            if (typeof this.payload.region === 'undefined' || typeof this.payload.endpoint === 'undefined') {
                throw new Error('[galeforce]: Action payload region or endpoint is required but undefined.');
            }
            if (typeof this.payload.method === 'undefined') {
                throw new Error('[galeforce]: Action payload method is required but undefined.');
            }

            // Execute-time property checks

            if (this.payload.gameName && !this.payload.tagLine) {
                throw new Error('[galeforce]: .gameName() must be chained with .tagLine().');
            }

            await this.waitForRateLimit(this.payload.region);
            await this.incrementRateLimit(this.payload.region);
            const request = this.RiotAPI.request(
                this.payload.endpoint,
                this.payload,
                this.payload.query,
                this.payload.body,
            );

            let data: unknown;
            if (this.payload.method === 'GET') {
                ({ data } = await request.get() as any);
            } else if (this.payload.method === 'POST') {
                if (typeof this.payload.body === 'undefined') throw new Error('[galeforce]: Action payload body is required but undefined.');
                ({ data } = await request.post() as any);
            } else if (this.payload.method === 'PUT') {
                if (typeof this.payload.body === 'undefined') throw new Error('[galeforce]: Action payload body is required but undefined.');
                ({ data } = await request.put() as any);
            }

            return data as R;
        } catch (e) {
            if (e.response?.status) {
                if (e.response.status === 403) {
                    throw new Error('[galeforce]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                } else {
                    throw new Error(`[galeforce]: Data fetch failed with status code ${e.response.status}`);
                }
            }

            throw e;
        }
    }

    private async getQueries(key: string, region: Region): Promise<number> {
        const { prefix } = this.cache.RLConfig;
        const value: string | null = await this.cache.get(prefix + key + region);
        const queries: number = parseInt(value || '0', 10);
        return queries;
    }

    protected async checkRateLimit(region: Region): Promise<boolean> {
        return (await Promise.all(Object.entries(this.cache.RLConfig.intervals)
            .map(async ([key, limit]: [string, number]): Promise<boolean> => (await this.getQueries(key, region)) < limit))).every(Boolean);
    }

    protected async waitForRateLimit(region: Region): Promise<void> {
        return new Promise((resolve) => {
            const WRLLoop = (): void => {
                this.checkRateLimit(region).then((ready: boolean) => {
                    if (ready) resolve();
                    else setTimeout(WRLLoop, 0);
                });
            };
            WRLLoop();
        });
    }

    protected async incrementRateLimit(region: Region): Promise<void> {
        const { intervals, prefix } = this.cache.RLConfig;
        async.each(Object.keys(intervals), async (key: string, callback: (err?: object) => void) => {
            const queries: number = await this.getQueries(key, region);
            if (Number.isNaN(queries) || queries === 0) {
                await this.cache.setex(prefix + key + region, parseInt(key, 10), '1');
            } else {
                await this.cache.incr(prefix + key + region);
            }

            callback();
        });
    }
}
/*
    The base Action class that all other composite actions should
    inherit from.
*/

import async from 'async';
import RiotAPIModule, { Region } from '../../riot-api';
import { Payload, CreatePayloadProxy } from './payload';
import Cache from '../caches/cache';
import SubmoduleMapInterface from '../interfaces/submodule-map';

abstract class Action {
    protected RiotAPI: RiotAPIModule;

    protected cache: Cache;

    protected SubmoduleMap: SubmoduleMapInterface;

    protected payload: Payload;

    constructor(SubmoduleMap: SubmoduleMapInterface, payload?: Payload) {
        this.SubmoduleMap = SubmoduleMap;
        this.RiotAPI = SubmoduleMap.RiotAPI;
        this.cache = SubmoduleMap.cache;

        this.payload = payload || CreatePayloadProxy({});
    }

    protected region(region: Region): this {
        this.payload.region = region;
        return this;
    }

    public abstract exec(): Promise<any>;

    protected async run<T>(method: 'GET' | 'POST' | 'PUT' = 'GET'): Promise<T> {
        try {
            if (typeof this.payload.region === 'undefined' || typeof this.payload.endpoint === 'undefined') {
                throw new Error('[galeforce]: Action payload region or endpoint is required but undefined.');
            }

            await this.waitForRateLimit(this.payload.region);
            await this.incrementRateLimit(this.payload.region);
            const request = this.RiotAPI.request(
                this.payload.endpoint,
                this.payload,
                this.payload.query,
                this.payload.body,
            );

            let data: any;
            if (method === 'GET') {
                ({ data } = await request.get() as any);
            } else if (method === 'POST') {
                if (typeof this.payload.body === 'undefined') throw new Error('[galeforce]: Action payload body is required but undefined.');
                ({ data } = await request.post() as any);
            } else if (method === 'PUT') {
                if (typeof this.payload.body === 'undefined') throw new Error('[galeforce]: Action payload body is required but undefined.');
                ({ data } = await request.put() as any);
            }

            return data as T;
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
        const value: string | null = await this.cache.get(this.cache.RLConfig.prefix + key + region);
        const queries: number = parseInt(value || '0', 10);
        return queries;
    }

    protected async checkRateLimit(region: Region): Promise<boolean> {
        return (await Promise.all(Object.entries(this.cache.RLConfig.intervals).map(async ([key, limit]: [string, number]): Promise<boolean> => (await this.getQueries(key, region)) < limit))).every(Boolean);
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
        async.each(Object.keys(this.cache.RLConfig.intervals), async (key: string, callback: (err?: object) => void) => {
            const queries: number = await this.getQueries(key, region);
            if (Number.isNaN(queries) || queries === 0) {
                await this.cache.setex(this.cache.RLConfig.prefix + key + region, parseInt(key, 10), '1');
            } else {
                await this.cache.incr(this.cache.RLConfig.prefix + key + region);
            }

            callback();
        });
    }
}

export default Action;

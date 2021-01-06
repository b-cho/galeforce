/*
    The base Action class that all other composite actions should
    inherit from.
*/

import async from 'async';
import RiotAPIModule, { Region } from '../../riot-api';
import Cache from '../caches/cache';
import SubmoduleMapInterface from '../interfaces/submodule-map';

type Payload = {
    endpoint?: string;
    region?: Region;
    summonerId?: string;
    accountId?: string;
    puuid?: string;
    summonerName?: string;
    matchId?: number;
}

abstract class Action {
    protected RiotAPI: RiotAPIModule;

    protected cache: Cache;

    protected payload: Payload = {};

    constructor(SubmoduleMap: SubmoduleMapInterface, endpoint?: string) {
        this.RiotAPI = SubmoduleMap.RiotAPI;
        this.cache = SubmoduleMap.cache;

        this.payload.endpoint = endpoint;
    }

    protected region(region: Region): this {
        // Region check in case types are not followed
        if (!(Object as any).values(Region).includes(region.toLowerCase())) {
            throw new Error('[galeforce]: Invalid region provided.');
        }

        this.payload.region = region;
        return this;
    }

    protected summonerId(summonerId: string): this {
        if (summonerId.length > 63) {
            throw new Error('[galeforce]: summonerId is invalid according to Riot specifications (length > 63).');
        }

        this.payload.summonerId = summonerId;
        return this;
    }

    protected accountId(accountId: string): this {
        if (accountId.length > 56) {
            throw new Error('[galeforce]: accountId is invalid according to Riot specifications (length > 56).');
        }

        this.payload.accountId = accountId;
        return this;
    }

    protected puuid(puuid: string): this {
        if (puuid.length > 78) {
            throw new Error('[galeforce]: puuid is invalid according to Riot specifications (length > 78).');
        }

        this.payload.puuid = puuid;
        return this;
    }

    protected name(name: string): this {
        this.payload.summonerName = name;
        return this;
    }

    protected matchId(matchId: number): this {
        this.payload.matchId = matchId;
        return this;
    }

    public abstract exec(): Promise<any>;

    protected async run<T>(): Promise<T> {
        try {
            if(typeof this.payload.region === 'undefined' || typeof this.payload.endpoint === 'undefined') {
                throw new Error('[galeforce]: Action payload region or endpoint is required but undefined.')
            }

            await this.waitForRateLimit(this.payload.region);
            await this.incrementRateLimit(this.payload.region);
            const { data }: any = await this.RiotAPI.request(this.payload.endpoint, this.payload).get();

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
        return (await Promise.all(Object.entries(this.cache.RLConfig.intervals).map(async ([key, limit]: [string, number]): Promise<boolean> => {
            return (await this.getQueries(key, region)) < limit;
        }))).every(Boolean);
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

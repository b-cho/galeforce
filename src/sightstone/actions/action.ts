/*
    The base Action class that all other composite actions should
    inherit from.
*/

import async from 'async';
import RiotAPIModule, { Region } from '../../riot-api';
import Cache from '../caches/cache';
import SubmoduleMapInterface from '../interfaces/submodule-map';

abstract class Action {
    protected RiotAPI: RiotAPIModule;

    protected cache: Cache;

    protected server: Region;

    protected summonerId?: string;

    protected accountId?: string;

    protected summonerName?: string;

    protected matchId?: number;

    constructor(SubmoduleMap: SubmoduleMapInterface, server: Region) {
        // Region check in case types are not followed
        if (!(Object as any).values(Region).includes(server.toLowerCase())) {
            throw new Error('[sightstone]: Invalid server region provided.');
        }

        this.RiotAPI = SubmoduleMap.RiotAPI;
        this.cache = SubmoduleMap.cache;
        this.server = server;
    }

    public abstract exec(): Promise<any>;

    protected async run<T>(endpoint: string, parameters: { [key: string]: unknown }): Promise<T> {
        try {
            await this.waitForRateLimit(this.server);
            await this.incrementRateLimit(this.server);
            const { data }: any = await this.RiotAPI.request(endpoint, parameters).get();

            return data as T;
        } catch (e) {
            if (e.response?.status) {
                if (e.response.status === 403) {
                    throw new Error('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                } else {
                    throw new Error(`[sightstone]: Data fetch failed with status code ${e.response.status}`);
                }
            }

            throw e;
        }
    }

    protected async checkRateLimit(server: Region): Promise<boolean> {
        return (await Promise.all(Object.entries(this.cache.RLConfig.intervals).map(async ([key, limit]: [string, number]): Promise<boolean> => {
            const value: string | null = await this.cache.get(this.cache.RLConfig.prefix + key + server);
            const queries: number = parseInt(value || '0', 10);
            return queries < limit;
        }))).every(Boolean);
    }

    protected async waitForRateLimit(server: Region): Promise<void> {
        return new Promise((resolve) => {
            const WRLLoop = (): void => {
                this.checkRateLimit(server).then((ready: boolean) => {
                    if (ready) resolve();
                    else setTimeout(WRLLoop, 0);
                });
            };
            WRLLoop();
        });
    }

    protected async incrementRateLimit(server: Region): Promise<void> {
        async.each(Object.keys(this.cache.RLConfig.intervals), async (key: string, callback: (err?: object) => void) => {
            const value: string | null = await this.cache.get(this.cache.RLConfig.prefix + key + server);
            const queries: number = parseInt(value || '0', 10);
            if (Number.isNaN(queries) || queries === 0) {
                await this.cache.setex(this.cache.RLConfig.prefix + key + server, parseInt(key, 10), '1');
            } else {
                await this.cache.incr(this.cache.RLConfig.prefix + key + server);
            }

            callback();
        });
    }
}

export default Action;

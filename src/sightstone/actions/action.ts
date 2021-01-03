/*
    The base Action class that all other composite actions should
    inherit from.
*/

import async from 'async';
import RiotAPIModule from '../../riot-api';
import Cache from '../caches/cache';
import SubmoduleMapInterface from '../interfaces/submodule-map';

abstract class Action {
    protected RiotAPI: RiotAPIModule;

    protected cache: Cache;

    constructor(SubmoduleMap: SubmoduleMapInterface) {
        this.RiotAPI = SubmoduleMap.RiotAPI;
        this.cache = SubmoduleMap.cache;
    }

    public abstract run(): Promise<any>;

    protected async checkRateLimit(): Promise<boolean> {
        return (await Promise.all(Object.entries(this.cache.RLConfig.intervals).map(async ([key, limit]: [string, number]): Promise<boolean> => {
            let queries: number = parseInt(await this.cache.get(this.cache.RLConfig.prefix + key) || '0', 10);
            if (Number.isNaN(queries)) queries = 0; // If key doesn't exist then 0 queries have been executed within the given interval.

            if (queries < limit) return true;
            return false;
        }))).every(Boolean);
    }

    protected async waitForRateLimit(): Promise<void> {
        return new Promise((resolve) => {
            const WRLLoop = (): void => {
                this.checkRateLimit().then((ready: boolean) => {
                    if (ready) resolve();
                    else setTimeout(WRLLoop, 25);
                });
            };
            WRLLoop();
        });
    }

    protected async incrementRateLimit(): Promise<void> {
        const prefix: string = this.cache.RLConfig.prefix;
        async.each(Object.keys(this.cache.RLConfig.intervals), async (key: string, callback: Function) => {
            const queries: number = parseInt(await this.cache.get(prefix + key) || '0', 10);
            await this.cache.incr(prefix + key);
            if (Number.isNaN(queries) || queries === 0) await this.cache.expire(prefix + key, parseInt(key, 10));
            callback();
        });
    }
}

export default Action;

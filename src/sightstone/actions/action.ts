/*
    The base Action class that all other composite actions should
    inherit from.
*/

import RiotAPIModule from '../../riot-api';
import DatabaseInternal from '../databases/database';
import Cache from '../caches/cache';
import SubmoduleMapInterface from '../interfaces/submodule-map';

abstract class Action {
    protected RiotAPI: RiotAPIModule;

    protected database: DatabaseInternal;

    protected cache: Cache;

    constructor(SubmoduleMap: SubmoduleMapInterface) {
        this.RiotAPI = SubmoduleMap.RiotAPI;
        this.database = SubmoduleMap.database;
        this.cache = SubmoduleMap.cache;
    }

    public abstract run(): Promise<any>;

    protected async checkRateLimit(): Promise<boolean> {
        const prefix: string = this.cache.RLConfig.prefix;

        const underLimit: boolean = Object.entries(this.cache.RLConfig.intervals).every(async ([key, limit]: [string, number]) => {
            let queries: number = parseInt(await this.cache.get(prefix + key), 10);
            if (Number.isNaN(queries)) queries = 0; // If key doesn't exist then 0 queries have been executed within the given interval.
            return queries < limit;
        });

        return underLimit;
    }

    protected async waitForRateLimit(): Promise<void> {
        return new Promise((resolve) => {
            const WRLLoop = (): void => {
                this.checkRateLimit().then((ready: boolean) => {
                    if (ready) resolve();
                    else setTimeout(WRLLoop, Math.floor(Math.random() * 50) + 25);
                });
            };
            WRLLoop();
        });
    }

    protected async incrementRateLimit(): Promise<void> {
        const prefix: string = this.cache.RLConfig.prefix;
        Object.entries(this.cache.RLConfig.intervals).forEach(async ([key, value]) => {
            const queries: number = parseInt(await this.cache.get(prefix + key), 10);
            await this.cache.incr(prefix + key);
            if (Number.isNaN(queries) || queries === 0) await this.cache.expire(prefix + key, parseInt(key, 10));
        });
    }
}

export default Action;

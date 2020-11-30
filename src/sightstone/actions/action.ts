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

        const promises: Promise<boolean>[] = Object.entries(this.cache.RLConfig.intervals).map(async ([key, limit]: [string, number]) => {
            return new Promise(async (resolve, reject) => {
                let queries: number = parseInt(await this.cache.get(prefix + key), 10);
                if (Number.isNaN(queries)) queries = 0; // If key doesn't exist then 0 queries have been executed within the given interval.

                if(queries < limit) resolve(true);
                else resolve(false);
            });
        });

        return (await Promise.all(promises)).every(Boolean);
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
        for (const key of Object.keys(this.cache.RLConfig.intervals)) {
            const queries: number = parseInt(await this.cache.get(prefix + key), 10);
            await this.cache.incr(prefix + key);
            if (Number.isNaN(queries) || queries === 0) await this.cache.expire(prefix + key, parseInt(key, 10));
        }
    }
}

export default Action;

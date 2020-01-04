/*
    The base Action class that all other composite actions should
    inherit from.
*/

import async from 'async';
import Bluebird from 'bluebird';
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

    public abstract async run(): Promise<any>;

    protected async checkRateLimit(): Promise<boolean> {
        const prefix: string = this.cache.RLConfig.prefix;

        const underLimit: boolean = await Bluebird.promisify(async.every)(Object.entries(this.cache.RLConfig.intervals), async ([key, limit], callback) => {
            let queries: number = parseInt(await this.cache.get(prefix + key), 10);
            if (Number.isNaN(queries)) queries = 0; // If key doesn't exist then 0 queries have been executed within the given interval.
            callback(null, queries < limit);
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
            if (Number.isNaN(queries)) {
                await this.cache.set(prefix + key, '1');
                await this.cache.expire(prefix + key, parseInt(key, 10));
            } else {
                await this.cache.incr(prefix + key);
            }
        });
    }
}

export default Action;

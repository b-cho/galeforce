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

    constructor(SubmoduleMap: SubmoduleMapInterface) {
        this.RiotAPI = SubmoduleMap.RiotAPI;
        this.cache = SubmoduleMap.cache;
    }

    public abstract run(): Promise<any>;

    protected async checkRateLimit(server: Region): Promise<boolean> {
        return (await Promise.all(Object.entries(this.cache.RLConfig.intervals).map(async ([key, limit]: [string, number]): Promise<boolean> => {
            const value: string | null = await this.cache.get(this.cache.RLConfig.prefix + key + server);
            const queries: number = parseInt(value || '0');
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
        async.each(Object.keys(this.cache.RLConfig.intervals), async (key: string, callback: Function) => {
            const value: string | null = await this.cache.get(this.cache.RLConfig.prefix + key + server);
            const queries: number = parseInt(value || '0');
            if (Number.isNaN(queries) || queries === 0) {
                await this.cache.setex(this.cache.RLConfig.prefix + key + server, parseInt(key), '1');
            } else {
                await this.cache.incr(this.cache.RLConfig.prefix + key + server);
            }
             
            callback();
        });
    }
}

export default Action;

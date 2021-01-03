/*
    The RedisCache object uses Redis to implement the methods outlined
    in Cache, along with a few others that are native to Redis.
*/

import redis, { RedisClient } from 'redis';
import Bluebird from 'bluebird';
import Cache, { RateLimitConfig } from './cache';

// Promisify node-redis functions before v4
Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

declare module 'redis' { // Async definitions for Redis
    export interface RedisClient extends NodeJS.EventEmitter {
        setAsync(key: string, value: string): Promise<void>;
        getAsync(key: string): Promise<string>;
        incrAsync(key: string): Promise<void>;
        expireAsync(key: string, seconds: number): Promise<void>;
        flushdbAsync(): Promise<void>;
    }
}

class RedisCache extends Cache {
    private client: RedisClient;

    constructor(uri: string, RLConfig?: RateLimitConfig, client?: RedisClient) {
        super(typeof RLConfig !== 'undefined' ? RLConfig : { prefix: '', intervals: {} });
        if(client !== undefined) this.client = client;
        else this.client = redis.createClient(uri);
        Bluebird.promisifyAll(this.client);
    }

    public async get(key: string): Promise<string | null> {
        return this.client.getAsync(key);
    }

    public async set(key: string, value: string | object): Promise<void> {
        let setValue: string;
        if (typeof value === 'object') setValue = JSON.stringify(value);
        else setValue = value;

        await this.client.setAsync(key, setValue);
    }

    public async incr(key: string): Promise<void> {
        await this.client.incrAsync(key);
    }

    public async expire(key: string, ttl: number): Promise<void> {
        await this.client.expireAsync(key, ttl);
    }

    public async flush(): Promise<void> {
        await this.client.flushdbAsync();
    }
}

export default RedisCache;

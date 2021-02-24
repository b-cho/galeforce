/*
    The RedisCache object uses Redis to implement the methods outlined
    in Cache, along with a few others that are native to Redis.
*/

import redis, { RedisClient } from 'redis';
import Bluebird from 'bluebird';
import { Cache, RateLimitConfig } from './cache';

// Promisify node-redis functions before v4
Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

declare module 'redis' { // Async definitions for Redis
    export interface RedisClient extends NodeJS.EventEmitter {
        getAsync(key: string): Promise<string | null>;
        setAsync(key: string, value: string): Promise<void>;
        setexAsync(key: string, ttl: number, value: string): Promise<void>;
        incrAsync(key: string): Promise<void>;
        expireAsync(key: string, seconds: number): Promise<void>;
        flushdbAsync(): Promise<void>;
    }
}

export class RedisCache extends Cache {
    private client: RedisClient;

    constructor(uri: string, RLConfig?: RateLimitConfig) {
        super(typeof RLConfig !== 'undefined' ? RLConfig : { prefix: '', intervals: {} });
        this.client = redis.createClient(uri);
        Bluebird.promisifyAll(this.client);
    }

    public async get(key: string): Promise<string | null> {
        return this.client.getAsync(key);
    }

    public async set(key: string, value: string, ttl?: number): Promise<void> {
        if (ttl) await this.client.setexAsync(key, ttl, value);
        else await this.client.setAsync(key, value);
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

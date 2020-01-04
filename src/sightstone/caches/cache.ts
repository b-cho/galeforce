/*
    The Cache object is an in-memory storage object for request
    storage and rate-limit management.
*/

interface RateLimitConfig {
    prefix: string;
    intervals: {
        [key: number]: number;
    };
}

abstract class Cache {
    public RLConfig: RateLimitConfig;

    constructor(RLConfig: RateLimitConfig) {
        this.RLConfig = RLConfig;
    }

    public abstract async get(key: string): Promise<string>;

    public abstract async set(key: string, value: string): Promise<void>;

    public abstract async incr(key: string): Promise<void>;

    public abstract async expire(key: string, ttl: number): Promise<void>;

    public abstract async flush(): Promise<void>;
}

export { RateLimitConfig };
export default Cache;

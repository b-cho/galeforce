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

    public abstract get(key: string): Promise<string | null>;

    public abstract set(key: string, value: string, ttl?: number): Promise<void>;

    public abstract incr(key: string): Promise<void>;

    public abstract expire(key: string, ttl: number): Promise<void>;

    public abstract flush(): Promise<void>;
}

export { RateLimitConfig, Cache };

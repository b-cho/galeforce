import NodeCache from 'node-cache';
import { Cache, RateLimitConfig } from './cache';

export class JavascriptCache extends Cache {
    private client: NodeCache;

    constructor(RLConfig?: RateLimitConfig) {
        super(typeof RLConfig !== 'undefined' ? RLConfig : { prefix: '', intervals: {} });
        this.client = new NodeCache();
    }

    public async get(key: string): Promise<string | null> {
        return this.client.get(key) || null;
    }

    public async set(key: string, value: string, ttl?: number): Promise<void> {
        if (ttl) this.client.set(key, value, ttl);
        else this.client.set(key, value);
    }

    public async incr(key: string): Promise<void> {
        const currentValue: string | null = await this.get(key);
        if (currentValue !== null) {
            const incrValue: number = parseInt(currentValue, 10) + 1;
            if (!isNaN(incrValue)) {
                const ttl: number | undefined = this.client.getTtl(key);
                this.set(key, incrValue.toString(), ttl);
            }
        } else {
            this.set(key, '1');
        }
    }

    public async expire(key: string, ttl: number): Promise<void> {
        this.client.ttl(key, ttl);
    }

    public async flush(): Promise<void> {
        this.client.flushAll();
    }
}

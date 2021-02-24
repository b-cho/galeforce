/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
    The NullCache object is essentially a non-cache in that it
    doesn't store anything related to rate-limits, etc.
    It can be used just like a regular cache, but will probably
    raise errors when it is actually needed for operations.
*/

import { Cache } from './cache';

export default class NullCache extends Cache {
    constructor() {
        super({ prefix: '', intervals: [] });
    }

    public async get(key: string): Promise<string | null> {
        return null;
    }

    public async set(key: string, value: string, ttl?: number): Promise<void> {}

    public async incr(key: string): Promise<void> {}

    public async expire(key: string, ttl: number): Promise<void> {}

    public async flush(): Promise<void> {}
}

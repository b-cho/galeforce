import { Region } from '../../riot-api';
import { ConfigInterface } from '../interfaces/config';

export default abstract class RateLimiter {
    public readonly config: ConfigInterface['rate-limit'];

    constructor(config: ConfigInterface['rate-limit']) {
        this.config = config;
    }

    /**
     * Schedule a promise through the specified regional rate limiter.
     *
     * @param request A function returning a request Promise.
     * @param region The regional rate limiter to schedule the `request` under.
     * @returns Another promise which executes *after* rate limit delays finish.
     */
    public abstract schedule<T>(request: () => Promise<T>, region?: Region): Promise<T>;
}

import Bottleneck from 'bottleneck';
import _ from 'lodash';
import debug from 'debug';
import chalk from 'chalk';
import * as Redis from 'redis';
import RateLimiter from './rate-limiter';
import { ConfigInterface } from '../interfaces/config';
import { Region } from '../../riot-api';

const ratelimitDebug = debug('galeforce:rate-limit');

export default class BottleneckRateLimiter extends RateLimiter {
    protected group: Bottleneck.Group;

    constructor(config: ConfigInterface['rate-limit']) {
        super(config);

        let options: object;
        if (config.cache.type === 'redis' && typeof config.cache.uri !== 'undefined') {
            options = {
                /* Limiter options */
                maxConcurrent: config.options['max-concurrent'],
                minTime: config.options['min-time'],

                /* Clustering options */
                id: config.cache['key-id'],
                datastore: 'redis',
                clientOptions: {
                    url: config.cache.uri,
                },
                // timeout should default to 300 seconds
                timeout: (_.max(Object.keys(config.options.intervals).map((time) => parseInt(time, 10))) || 300) * 1000,

                // Explicitly pass in Redis object to prevent conflict with node-redis@4.x
                Redis,
            };
        } else if (config.cache.type === 'internal') {
            options = {
                /* Limiter options */
                maxConcurrent: config.options['max-concurrent'],
                minTime: config.options['min-time'],

                /* Clustering options */
                // timeout should default to 300 seconds
                timeout: (_.max(Object.keys(config.options.intervals).map((time) => parseInt(time, 10))) || 300) * 1000,
            };
        } else {
            throw new Error('[galeforce]: Invalid rate limit cache type provided in config.');
        }

        ratelimitDebug(`${chalk.bold.blueBright('create')} ${chalk.bold.red('bottleneck')} \u00AB %O`, options);
        this.group = new Bottleneck.Group(options);

        // Set options when creating new rate limiters
        this.group.on('created', (limiter: Bottleneck, key: string) => {
            ratelimitDebug(`${chalk.bold.red(key)} | ${chalk.bold.blueBright('create')} \u00AB ${chalk.bold.red('limiter')}`);
            Object.entries(config.options.intervals).forEach(([interval, limit]) => {
                limiter.chain(new Bottleneck({ // Set limiter options by chaining based on each configured interval
                    reservoir: limit,
                    reservoirRefreshInterval: parseInt(interval, 10) * 1000,
                    reservoirRefreshAmount: limit,
                }));
            });

            // Handle failed requests and queue retry attempts
            limiter.on('failed', async (error, jobInfo) => {
                ratelimitDebug(`${chalk.bold.red(key)} | ${chalk.bold.redBright('failed')}`);
                // Retry if (1) an HTTP 429 error is returned, (2) a retry-after header is provided, and (3) the number of retry attempts is less than the configured maximum
                if (error.response.status === 429 && error.response.headers['retry-after'] && jobInfo.retryCount < config.options['retry-count-after-429']) {
                    const waitTime = parseInt(error.response.headers['retry-after'], 10) * 1000;
                    ratelimitDebug(`${chalk.bold.red(key)} | ${chalk.bold.magenta('retry')} (${chalk.bold.cyan(jobInfo.retryCount + 1)}/${chalk.bold.blue(config.options['retry-count-after-429'])}) in ${chalk.bold.magenta(waitTime)} ms`);
                    return waitTime; // Retry the original request after the amount of time specified by the response headers
                }
            });
        });
    }

    public schedule<T>(request: () => Promise<T>, region?: Region): Promise<T> {
        if (region) {
            ratelimitDebug(`${chalk.bold.red(region)} | ${chalk.bold.yellow('schedule')}`);
            return this.group.key(region).schedule(request); // Schedule request through limiter only if region is specified
        }
        return request();
    }
}

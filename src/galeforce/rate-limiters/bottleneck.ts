import Bottleneck from 'bottleneck';
import _ from 'lodash';
import debug from 'debug';
import chalk from 'chalk';
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
                timeout: (_.max(Object.keys(config.options.intervals).map((time) => parseInt(time, 10))) || 300) * 1000, // default 5 minutes
            };
        } else if (config.cache.type === 'internal') {
            options = {
                /* Limiter options */
                maxConcurrent: config.options['max-concurrent'],
                minTime: config.options['min-time'],

                /* Clustering options */
                timeout: (_.max(Object.keys(config.options.intervals).map((time) => parseInt(time, 10))) || 300) * 1000, // default 5 minutes
            };
        } else {
            throw new Error('[galeforce]: Invalid rate limit cache type provided in config.');
        }

        ratelimitDebug(`${chalk.bold.blueBright('create')} ${chalk.bold.red('bottleneck')} \u00AB %O`, options);
        this.group = new Bottleneck.Group(options);

        this.group.on('created', (limiter: Bottleneck, key: string) => {
            ratelimitDebug(`${chalk.bold.red(key)} | ${chalk.bold.blueBright('create')} \u00AB ${chalk.bold.red('limiter')}`);
            Object.entries(config.options.intervals).forEach(([interval, limit]) => {
                limiter.chain(new Bottleneck({
                    reservoir: limit,
                    reservoirRefreshInterval: parseInt(interval, 10) * 1000,
                    reservoirRefreshAmount: limit,
                }));
            });

            limiter.on('failed', async (error, jobInfo) => {
                ratelimitDebug(`${chalk.bold.red(key)} | ${chalk.bold.redBright('failed')}`);
                if (error.response.status === 429 && error.response.headers['retry-after'] && jobInfo.retryCount < config.options['retry-count-after-429']) {
                    const waitTime = parseInt(error.response.headers['retry-after'], 10) * 1000;
                    ratelimitDebug(`${chalk.bold.red(key)} | ${chalk.bold.magenta('retry')} (${chalk.bold.cyan(jobInfo.retryCount + 1)}/${chalk.bold.blue(config.options['retry-count-after-429'])}) in ${chalk.bold.magenta(waitTime)} ms`);
                    return waitTime;
                }
            });
        });
    }

    public schedule<T>(request: () => Promise<T>, region?: Region): Promise<T> {
        if (region) {
            ratelimitDebug(`${chalk.bold.red(region)} | ${chalk.bold.yellow('schedule')}`);
            return this.group.key(region).schedule(request);
        }
        return request();
    }
}

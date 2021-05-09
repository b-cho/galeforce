import debug from 'debug';
import chalk from 'chalk';
import { Region } from '../../riot-api';
import RateLimiter from './rate-limiter';
import { ConfigInterface } from '../interfaces/config';

const ratelimitDebug = debug('galeforce:rate-limit');

export default class NullRateLimiter extends RateLimiter {
    constructor(config: ConfigInterface['rate-limit']) {
        super(config);

        ratelimitDebug(`${chalk.bold.blueBright('create')} \u00AB ${chalk.bold.red('null')}`);
    }

    public schedule<T>(request: () => Promise<T>, region?: Region): Promise<T> {
        return request();
    }
}

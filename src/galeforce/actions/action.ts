/**
    The base Action class that all other composite actions should
    inherit from.
    @packageDocumentation
*/

import debug from 'debug';
import chalk from 'chalk';
import async from 'async';
import { v4 as uuidv4 } from 'uuid';
import { Region } from '../../riot-api';
import { Payload, CreatePayloadProxy } from './payload';
import SubmoduleMap from '../interfaces/submodule-map';

const actionDebug = debug('galeforce:action');
const rateLimitDebug = debug('galeforce:rate-limit');

/**
 * @template TResult The return type of the Action.
 */
export default class Action<TResult> {
    protected submodules: SubmoduleMap;

    /**
     * The payload containing the data (endpoint, request type, parameters, etc.) related to the
     * associated Action. The type guards associated with setting certain properties of the payload
     * are checked at runtime and may throw errors when provided invalid values.
     */
    public payload: Payload;

    /**
     *
     * @param submodules The reference to the submodules ({@link RiotAPI}, {@link Cache}). Passed into the action.
     */
    constructor(submodules: SubmoduleMap) {
        this.submodules = submodules;
        this.payload = CreatePayloadProxy({
            _id: uuidv4(),
        });

        actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('initialize')}`);
    }

    /**
     * Executes the action, sending an HTTP request to the Riot API servers
     * and retrieving the associated data from the appropriate endpoint.
     * @throws Will throw an error if a required payload value (*region*,
     * *body* on POST or PUT requests, etc.) is missing or the HTTP request
     * fails with an error.
     */
    public async exec(): Promise<TResult> {
        this.inferEndpoint();

        actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('execute')} \u00AB %O`, this.payload);
        try {
            if (typeof this.payload.endpoint === 'undefined') {
                throw new Error('[galeforce]: Action endpoint is required but undefined.');
            }
            if (typeof this.payload.method === 'undefined') {
                throw new Error('[galeforce]: Action method is required but undefined.');
            }

            // Execute-time property checks

            if (this.payload.gameName && !this.payload.tagLine) {
                throw new Error('[galeforce]: .gameName() must be chained with .tagLine().');
            }

            // Increment rate limit for non-Data Dragon requests.
            if (this.payload.type && ['lol', 'val', 'riot'].includes(this.payload.type)) {
                if (typeof this.payload.region !== 'undefined') {
                    await this.waitForRateLimit(this.payload.region);
                    await this.incrementRateLimit(this.payload.region);
                } else {
                    throw new Error('[galeforce]: Action payload region is required but undefined.');
                }
            }

            let request;
            if (this.payload.type === 'gc') {
                request = this.submodules.RiotAPI.gcRequest(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
            } else if (this.payload.type === 'ddragon-buffer') {
                request = this.submodules.RiotAPI.bufferRequest(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
            } else {
                request = this.submodules.RiotAPI.request(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
            }

            let response: TResult;

            if (this.payload.method === 'GET') {
                response = (await request.get() as { data: TResult }).data;
            } else if (this.payload.method === 'POST') {
                if (typeof this.payload.body === 'undefined') {
                    throw new Error('[galeforce]: Action payload body is required but undefined.');
                }
                response = (await request.post() as { data: TResult }).data;
            } else if (this.payload.method === 'PUT') {
                if (typeof this.payload.body === 'undefined') {
                    throw new Error('[galeforce]: Action payload body is required but undefined.');
                }
                response = (await request.put() as { data: TResult }).data;
            } else {
                throw new Error('[galeforce]: Invalid action method provided.');
            }

            actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.green(200)}`);
            return response;
        } catch (e) {
            if (e.response?.status) {
                actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.red(e.response.status)}`);
                if (e.response.status === 401) {
                    throw new Error('[galeforce]: No Riot API key was provided. Please ensure that your key is present in your configuration file or object. (401 Unauthorized)');
                } else if (e.response.status === 403) {
                    throw new Error('[galeforce]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (403 Forbidden)');
                } else {
                    throw new Error(`[galeforce]: Data fetch failed with status code ${e.response.status}`);
                }
            }

            actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.red('error')}`);
            throw e;
        }
    }

    protected inferEndpoint(): void { /* Empty because this may be implemented by classes that inherit from Action */ }

    /**
     * Returns the **encoded** target URL for the action without executing an HTTP request.
     * Useful if the URL string is needed for custom actions outside the scope of the library.
     * @throws Will throw an error if a required payload value (*region*,
     * *body* on POST or PUT requests, etc.) is missing.
     */
    public URL(): string {
        this.inferEndpoint();

        if (typeof this.payload.endpoint === 'undefined') {
            throw new Error('[galeforce]: Action endpoint is required but undefined.');
        }

        const request = this.submodules.RiotAPI.request(
            this.payload.endpoint,
            this.payload,
            this.payload.query,
            this.payload.body,
        );

        return request.targetURL;
    }

    private async getQueries(key: string, region: Region): Promise<number> {
        const { prefix } = this.submodules.cache.RLConfig;
        const value: string | null = await this.submodules.cache.get(prefix + key + region);
        const queries: number = parseInt(value || '0', 10);
        return queries;
    }

    protected async checkRateLimit(region: Region): Promise<boolean> {
        return (await Promise.all(Object.entries(this.submodules.cache.RLConfig.intervals)
            .map(async ([key, limit]: [string, number]): Promise<boolean> => (await this.getQueries(key, region)) < limit))).every(Boolean);
    }

    protected async waitForRateLimit(region: Region): Promise<void> {
        rateLimitDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.red('wait')} ${region}`);
        return new Promise((resolve) => {
            const WRLLoop = (): void => {
                this.checkRateLimit(region).then((ready: boolean) => {
                    if (ready) {
                        rateLimitDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.red('OK')} ${region}`);
                        resolve();
                    } else setTimeout(WRLLoop, 0);
                });
            };
            WRLLoop();
        });
    }

    protected async incrementRateLimit(region: Region): Promise<void> {
        rateLimitDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.red('increment')} ${region}`);
        const { intervals, prefix } = this.submodules.cache.RLConfig;
        async.each(Object.keys(intervals), async (key: string, callback: (err?: object) => void) => {
            const queries: number = await this.getQueries(key, region);
            if (Number.isNaN(queries) || queries === 0) {
                await this.submodules.cache.set(prefix + key + region, '1', parseInt(key, 10));
            } else {
                await this.submodules.cache.incr(prefix + key + region);
            }

            callback();
        });
    }
}

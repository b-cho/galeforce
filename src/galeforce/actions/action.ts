/**
    The base Action class that all other composite actions should
    inherit from.
    @packageDocumentation
*/

import debug from 'debug';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Payload, ModifiablePayload, CreatePayloadProxy } from './payload';
import SubmoduleMap from '../interfaces/submodule-map';
import Request from '../../riot-api/requests';
import axios from 'axios';

const actionDebug = debug('galeforce:action');

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
     * Sets multiple values in the Action payload simultaneously.
     *
     * @param payload The payload with which the Action's payload is overwritten
     * @returns The current Action (with the updated payload state).
     */
    public set(payload: ModifiablePayload): this {
        this.payload = { ...this.payload, ..._.pick(payload, Object.getOwnPropertyNames(this.payload)) };
        return this;
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
            // Ensure required payload properties exist
            if (typeof this.payload.endpoint === 'undefined') {
                throw new Error('[galeforce]: Action endpoint is required but undefined.');
            }
            if (typeof this.payload.method === 'undefined') {
                throw new Error('[galeforce]: Action method is required but undefined.');
            }
            if (this.payload.type && ['lol', 'val', 'riot'].includes(this.payload.type) && typeof this.payload.region === 'undefined') {
                throw new Error('[galeforce]: Action payload region is required but undefined.');
            }

            // Runtime property checks to ensure the Action payload is properly formed
            if (this.payload.gameName && !this.payload.tagLine) {
                throw new Error('[galeforce]: .gameName() must be chained with .tagLine().');
            }

            // Set request depending on type
            let request: Request;
            switch (this.payload.type) {
            case 'gc': // Game Client requests (requiring an SSL certificate)
                request = this.submodules.RiotAPI.gcRequest(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
                break;
            case 'lol-ddragon-buffer': // Data Dragon non-JSON files
            case 'lor-ddragon-buffer':
                request = this.submodules.RiotAPI.bufferRequest(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
                break;
            default: // All other request types
                request = this.submodules.RiotAPI.request(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
                break;
            }

            // Schedule request depending on HTTP method
            let response: TResult;
            switch (this.payload.method) {
            case 'GET':
                // Schedule a GET request using the selected rate limiter
                response = (await this.submodules.RateLimiter.schedule(() => request.get(), this.payload.region)).data as TResult;
                break;
            case 'POST':
                // Ensure that the POST request has a defined body
                if (typeof this.payload.body === 'undefined') {
                    throw new Error('[galeforce]: Action payload body is required but undefined.');
                }
                // Schedule a POST request using the selected rate limiter
                response = (await this.submodules.RateLimiter.schedule(() => request.post(), this.payload.region)).data as TResult;
                break;
            case 'PUT':
                // Ensure that the PUT request has a defined body
                if (typeof this.payload.body === 'undefined') {
                    throw new Error('[galeforce]: Action payload body is required but undefined.');
                }
                // Schedule a PUT request using the selected rate limiter
                response = (await this.submodules.RateLimiter.schedule(() => request.put(), this.payload.region)).data as TResult;
                break;
            default: // Should never occur, but throw an error if reached
                throw new Error('[galeforce]: Invalid action method provided.');
            }

            actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.green(200)}`);
            return response;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.red(e.response?.status || 'error')}`);
                switch (e.response?.status) {
                case 401:
                    // Handle HTTP 401 Unauthorized errors, returned when no API key is used when requesting data.
                    throw new Error('[galeforce]: No Riot API key was provided. Please ensure that your key is present in your configuration file or object. (401 Unauthorized)');
                case 403:
                    // Handle HTTP 403 Forbidden errors, caused by the use of invalid or expired API keys.
                    throw new Error('[galeforce]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (403 Forbidden)');
                case undefined:
                    throw e;
                default:
                    // Generic HTTP error handling.
                    throw new Error(`[galeforce]: Data fetch failed with status code ${e.response?.status}`);
                }
            } else {
                throw new Error(`[galeforce]: ${e instanceof Error ? e.message : 'Data fetch failed with an unknown error'}`)
            }
        }
    }

    /* eslint-disable class-methods-use-this */
    protected inferEndpoint(): void { /* Empty because this may be implemented by classes that inherit from Action */ }

    /**
     * Returns the **encoded** target URL for the action without executing an HTTP request.
     * Useful if the URL string is needed for custom actions outside the scope of the library.
     * @throws Will throw an error if a required payload value (*region*,
     * *body* on POST or PUT requests, etc.) is missing.
     */
    public URL(): string {
        this.inferEndpoint();

        // Ensure required payload properties exist
        if (typeof this.payload.endpoint === 'undefined') {
            throw new Error('[galeforce]: Action endpoint is required but undefined.');
        }

        const request = this.submodules.RiotAPI.request(
            this.payload.endpoint,
            this.payload,
            this.payload.query,
            this.payload.body,
        );

        return request.targetURL; // Return only the target URL of the associated request
    }
}

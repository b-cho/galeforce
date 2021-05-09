/*
    The base request class is simply a "template" request class
    that needs to be implemented by other methods to be effective.
*/

import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import chalk from 'chalk';
import _ from 'lodash';

const requestDebug = debug('galeforce:riot-api');

export default class Request {
    public readonly targetURL: string;

    protected body: object;

    protected axiosOptions: AxiosRequestConfig;

    constructor(targetURL: string, body: object, axiosOptions?: AxiosRequestConfig) {
        this.targetURL = targetURL;
        this.body = body;
        this.axiosOptions = axiosOptions || {};
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green('initialize')}`);
    }

    /**
     * @private
     *
     * @param {String} template A list of string templates that are filled in with parameters.
     * @param {Object} match Parameters to fill in variables for the string templates.
     *
     * @return {[String]} Substituted version of template with parameter values from match.
     */
    protected static generateTemplateString(template: string, match: Record<string, unknown>): string {
        try {
            return _.template(template)(_.mapValues(match, (v) => { // Encode the components of the target URL (using values from the payload)
                if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                    return encodeURIComponent(v);
                }
                return v;
            }));
        } catch (e) {
            throw new Error(`[galeforce]: Action payload ${e.message.split(' ')[0]} is required but undefined.`);
        }
    }

    /**
     * @public
     * @async
     *
     * @param {[String]} endpoint Endpoint to get information from
     *
     * @return {Promise} Return JSON data as a promise (due to delayed request completion).
     */
    public async get(): Promise<object> {
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('GET')} \u00AB ${chalk.bold('query')} %O`, this.axiosOptions.params);
        return axios.get(this.targetURL, this.axiosOptions);
    }

    /**
     * @public
     * @async
     *
     * @param {[String]} endpoint Endpoint to post information to
     *
     * @return {Promise} Return JSON data as a promise (due to delayed request completion).
     */
    public async post(): Promise<object> {
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('POST')} \u00AB ${chalk.bold('query')} %O ${chalk.bold('body')} %O`, this.axiosOptions.params, this.body);
        return axios.post(this.targetURL, this.body, this.axiosOptions);
    }

    /**
     * @public
     * @async
     *
     * @param {[String]} endpoint Endpoint to put information
     *
     * @return {Promise} Return JSON data as a promise (due to delayed request completion).
     */
    public async put(): Promise<object> {
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('PUT')} \u00AB ${chalk.bold('query')} %O ${chalk.bold('body')} %O`, this.axiosOptions.params, this.body);
        return axios.put(this.targetURL, this.body, this.axiosOptions);
    }
}

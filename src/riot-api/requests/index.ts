/*
    The base request class is simply a "template" request class
    that needs to be implemented by other methods to be effective.
*/

import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import chalk from 'chalk';

const requestDebug = debug('galeforce:riot-api');

export default class Request {
    public readonly targetURL: string;

    protected body: object;

    protected axiosOptions: AxiosRequestConfig;

    constructor(targetURL: string, body: object, axiosOptions: AxiosRequestConfig = {}) {
        this.targetURL = targetURL;
        this.body = body;
        this.axiosOptions = axiosOptions;
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green('initialize')}`);
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

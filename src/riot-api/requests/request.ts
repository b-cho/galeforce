/*
    The base request class is simply a "template" request class
    that needs to be implemented by other methods to be effective.
*/

import axios from 'axios';
import debug from 'debug';
import chalk from 'chalk';

const requestDebug = debug('galeforce:riot-api');

export default abstract class Request {
    private targetURL: string;

    private headers: Record<string, unknown>;

    private query: object;

    private body: object;

    constructor(targetURL: string, headers: Record<string, unknown>, query: object, body: object) {
        this.targetURL = targetURL;
        this.headers = headers;
        this.query = query;
        this.body = body;
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
        return template.replace(/\$\{([\s]*[^;\s{]+[\s]*)\}/g, (mt: string): string => {
            const key = mt.substring(2, mt.length - 1);
            if (!Object.keys(match).includes(key)) {
                throw new Error(`[galeforce]: Action payload ${key} is required but undefined.`);
            }
            return match[key] as string;
        });
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
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('GET')} \u00AB ${chalk.bold('query')} %O`, this.query);
        return axios.get(encodeURI(this.targetURL), {
            headers: this.headers,
            params: this.query,
        });
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
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('POST')} \u00AB ${chalk.bold('query')} %O ${chalk.bold('body')} %O`, this.query, this.body);
        return axios.post(encodeURI(this.targetURL), this.body, {
            headers: this.headers,
            params: this.query,
        });
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
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('PUT')} \u00AB ${chalk.bold('query')} %O ${chalk.bold('body')} %O`, this.query, this.body);
        return axios.put(encodeURI(this.targetURL), this.body, {
            headers: this.headers,
            params: this.query,
        });
    }
}

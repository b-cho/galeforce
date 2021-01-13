/*
    The base request class is simply a "template" request class
    that needs to be implemented by other methods to be effective.
*/

import axios from 'axios';

abstract class Request {
    protected targetURL: string;

    protected headers: object;

    protected query: object;

    constructor(targetURL: string, headers: object, query: object) {
        this.targetURL = targetURL;
        this.headers = headers;
        this.query = query;
    }

    /**
     * @private
     *
     * @param {String} template A list of string templates that are filled in with parameters.
     * @param {Object} match Parameters to fill in variables for the string templates.
     *
     * @return {[String]} Substituted version of template with parameter values from match.
     */
    protected static generateTemplateString(template: string, match: { [key: string]: unknown }): string {
        return template.replace(/\$\{([\s]*[^;\s{]+[\s]*)\}/g, (mt: string) => {
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
     * @param {[String]} endpoint Endpoints to fetch information from
     *
     * @return {Promise} Return JSON data as a promise (due to delayed request completion).
     */
    public async get(): Promise<object> {
        return axios.get(encodeURI(this.targetURL), {
            headers: this.headers,
            params: this.query,
        });
    }
}

export default Request;

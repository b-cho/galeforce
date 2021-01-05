/* eslint-disable no-new-func */
/*
    The base request class is simply a "template" request class
    that needs to be implemented by other methods to be effective.
*/

import axios from 'axios';

abstract class Request {
    protected targetURL: string;

    protected headers: object;

    constructor(targetURL: string, headers: object) {
        this.targetURL = targetURL;
        this.headers = headers;
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
            return Object.keys(match).includes(key) ? (match[key] as string) : mt;
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
        });
    }
}

export default Request;

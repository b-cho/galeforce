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
    protected static generateTemplateString(template: string, match: object): string {
        // Replace ${expressions} (etc) with ${map['expressions']}.
        const sanitized = template
            .replace(/\$\{([\s]*[^;\s{]+[\s]*)\}/g, (_, _match) => `$\{map["${_match.trim()}"]}`)
            // Afterwards, delete any ${x} that is not ${map["expressions"]}'.
            .replace(/(\$\{(?!map\[")[^}]+"\]\})/g, '');

        return Function('map', `return \`${sanitized}\``)(match);
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
        return await axios.get(encodeURI(this.targetURL), {
            headers: this.headers,
        });
    }
}

export default Request;

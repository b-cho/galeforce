/*
    The RiotAPIRequest object is a class that contains the information for a single
    request to the Riot API server. It contains a method that can be called to return
    information relevant to that request.
*/

import rp from "request-promise";
import Request from "./request";
import Bluebird from "bluebird";

class RiotAPIRequest extends Request {
    private key: string;
    
    constructor(stringTemplate: string, parameters: object, key: string) {
        super(RiotAPIRequest.generateTemplateString(stringTemplate, parameters));
        this.key = key;
    }

    /**
     * @private
     * 
     * @param {String} template A list of string templates that are filled in with parameters.
     * @param {Object} match Parameters to fill in variables for the string templates.
     * 
     * @return {[String]} Substituted version of template with parameter values from match.
     */
    private static generateTemplateString(template: string, match: object): string {
        // Replace ${expressions} (etc) with ${map["expressions"]}.
        let sanitized = template
            .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match) {
                return `\$\{map\["${match.trim()}"\]\}`;
            })
            // Afterwards, replace anything that's not ${map["expressions"]}' (etc) with a blank string.
            .replace(/(\$\{(?!map\[")[^\}]+"\]\})/g, '');

        return Function('map', `return \`${sanitized}\``)(match);
    }

    /**
     * @public
     * 
     * @param {[String]} endpoint Endpoints to fetch information from
     * 
     * @return {Promise} Return JSON data as a promise (because request completion is not instantaneous).
     */
    public get(): Bluebird<any> {
        let options = {
            url: this.targetURL,
            headers: {
                "X-Riot-Token": this.key
            },
            json: true
        };
    
        return rp(options).promise();
    }
}

export default RiotAPIRequest;
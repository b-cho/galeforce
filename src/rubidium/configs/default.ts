import yaml from "yaml";
import fs from "fs";
import process from "process";
import dotenv from "dotenv";

import Config from "../interfaces/config";
dotenv.config(); // Add environment variables from .env (root directory) if necessary

/**
 * @param {String} template A list of string templates that are filled in with parameters.
 * @param {Object} match Parameters to fill in variables for the string templates.
 * 
 * @return {[String]} Substituted version of template with parameter values from match.
 */
function generateTemplateString(template: string, match: object): string {
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
 * @param {Object} obj An object to substitute values from process.env for
 * 
 * @return {Object} Substituted version of template with process.env replaced values
 */
function iterateReplace(obj: any): any {
    Object.keys(obj).forEach(key => {
        if(typeof obj[key] == 'string') {
            obj[key] = generateTemplateString(obj[key], process.env);
        }

        if (typeof obj[key] == 'object') {
            iterateReplace(obj[key]);
        }
    });
    return obj;
}

/**
 * 
 * @param {Object} filename The filename of the config file.
 * 
 * @return {Object} The corresponding config object.
 */
function getConfig(filename: string): Config {
    return iterateReplace(yaml.parse(fs.readFileSync(filename, "utf8")));
}

export default getConfig;
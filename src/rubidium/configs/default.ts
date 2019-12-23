/* eslint-disable no-new-func */

import yaml from 'yaml';
import fs from 'fs';
import process from 'process';
import dotenv from 'dotenv';
import ConfigInterface from '../interfaces/config';

dotenv.config(); // Add environment variables from .env (root directory) if necessary

/**
 * @private
 *
 * @param {String} template A list of string templates that are filled in with parameters.
 * @param {Object} match Parameters to fill in variables for the string templates.
 *
 * @return {[String]} Substituted version of template with parameter values from match.
 */
function generateTemplateString(template: string, match: object): string {
    // Replace ${expressions} (etc) with ${map['expressions']}.
    const sanitized = template
        .replace(/\$\{([\s]*[^;\s{]+[\s]*)\}/g, (_, _match) => `$\{map["${_match.trim()}"]}`)
        // Afterwards, delete any ${x} that is not ${map["expressions"]}'.
        .replace(/(\$\{(?!map\[")[^}]+"\]\})/g, '');

    return Function('map', `return \`${sanitized}\``)(match);
}

/**
 * @param {Object} obj An object to substitute values from process.env for
 *
 * @return {Object} Substituted version of template with process.env replaced values
 */
function iterateReplace(obj: any): object {
    let newObj: any;
    if (Array.isArray(obj)) {
        newObj = [...obj];
    } else {
        newObj = { ...obj };
    }

    Object.keys(newObj).forEach((key) => {
        if (typeof newObj[key] === 'string') {
            newObj[key] = generateTemplateString(newObj[key], process.env);
        }

        if (typeof newObj[key] === 'object') {
            newObj[key] = iterateReplace(newObj[key]);
        }
    });

    return newObj;
}

/**
 *
 * @param {string} filename The filename of the config file.
 *
 * @return {ConfigInterface} The corresponding config object.
 */
function getConfig(filename: string): ConfigInterface {
    return iterateReplace(yaml.parse(fs.readFileSync(filename, 'utf8'))) as ConfigInterface;
}

export default getConfig;

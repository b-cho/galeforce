/* eslint-disable no-new-func */

import yaml from 'yaml';
import fs from 'fs';
import process from 'process';
import dotenv from 'dotenv';
import Ajv, { JSONSchemaType } from 'ajv';
import * as TJS from 'typescript-json-schema';
import { resolve } from 'path';
import { ConfigInterface } from '../interfaces/config';

dotenv.config(); // Add environment variables from .env (root directory) if necessary

const program: TJS.Program = TJS.getProgramFromFiles([resolve('./src/sightstone/interfaces/config.ts')]);
const ConfigSchema = TJS.generateSchema(program, 'ConfigInterface', { required: true }) as JSONSchemaType<ConfigInterface>;

const ajv = new Ajv();
const validate = ajv.compile(ConfigSchema);

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
    const configObject = iterateReplace(yaml.parse(fs.readFileSync(filename, 'utf8')));
    if(validate(configObject)) return configObject;
    else throw new Error('Invalid config provided (config failed JSON schema validation).');
}

export default getConfig;

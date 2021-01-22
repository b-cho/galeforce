import yaml from 'yaml';
import fs from 'fs';
import process from 'process';
import Ajv, { JSONSchemaType } from 'ajv';
import { resolve } from 'path';
import * as TJS from 'typescript-json-schema';
import { ConfigInterface } from '../interfaces/config';

const configInterfacePath = resolve(__dirname + '/../interfaces/config.d.ts')
const program: TJS.Program = TJS.getProgramFromFiles([configInterfacePath]);
const ConfigSchema = TJS.generateSchema(program, 'ConfigInterface', { required: true }) as JSONSchemaType<ConfigInterface>;

const ajv = new Ajv();
export const validate = ajv.compile(ConfigSchema);

/**
 * @private
 *
 * @param {String} template A list of string templates that are filled in with parameters.
 * @param {Object} match Parameters to fill in variables for the string templates.
 *
 * @return {[String]} Substituted version of template with parameter values from match.
 */
function generateTemplateString(template: string): string {
    return template.replace(/\$\{([\s]*[^;\s{]+[\s]*)\}/g, (mt: string) => {
        const key = mt.substring(2, mt.length - 1);
        if (!Object.keys(process.env).includes(key)) {
            throw new Error(`[galeforce]: process.env.${key} is required in config file but is undefined.`);
        }
        return process.env[key] as string;
    });
}

/**
 * @param {Object} obj An object to substitute values from process.env for
 *
 * @return {Object} Substituted version of template with process.env replaced values
 */
function iterateReplace(obj: object): object {
    let newObj: any = JSON.parse(JSON.stringify(obj));

    Object.keys(newObj).forEach((key) => {
        if (typeof newObj[key] === 'string') {
            newObj[key] = generateTemplateString(newObj[key]);
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
    if (validate(configObject)) return configObject;
    throw new Error('Invalid config provided (config failed JSON schema validation).');
}

export default getConfig;

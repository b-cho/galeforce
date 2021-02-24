import yaml from 'yaml';
import fs from 'fs';
import process from 'process';
import Ajv, { JSONSchemaType } from 'ajv';
import * as TJS from 'typescript-json-schema';
import debug from 'debug';
import chalk from 'chalk';
import path from 'path';
import { ConfigInterface } from '../interfaces/config';

const initDebug = debug('galeforce:init');

initDebug(`${chalk.bold('reading config interface and converting to JSON schema')}`);
const configInterfacePath = path.join(__dirname, '..', 'interfaces', 'config.d.ts');
const program: TJS.Program = TJS.getProgramFromFiles([configInterfacePath]);
const ConfigSchema = TJS.generateSchema(program, 'ConfigInterface', { required: true }) as JSONSchemaType<ConfigInterface>;

const ajv = new Ajv();
export const validate = ajv.compile(ConfigSchema);

/**
 * @private
 *
 * @param {String} template A list of string templates that are filled in with environment variables.
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
 * @param {Record<string, unknown>} obj An object to substitute values from process.env for
 *
 * @return {Record<string, unknown>} Substituted version of template with process.env replaced values
 */
function recursivelySubstitute(obj: Record<string, string | object>): Record<string, string | object> {
    const newObj: Record<string, string | object> = JSON.parse(JSON.stringify(obj));

    Object.keys(newObj).forEach((key) => {
        if (typeof newObj[key] === 'string') {
            newObj[key] = generateTemplateString(newObj[key] as string);
        }

        if (typeof newObj[key] === 'object') {
            newObj[key] = recursivelySubstitute(newObj[key] as Record<string, string | object>);
        }
    });

    return newObj as Record<string, string | object>;
}

/**
 *
 * @param {string} filename The filename of the config file.
 *
 * @return {ConfigInterface} The corresponding config object.
 */
export function getConfig(filename: string): ConfigInterface {
    const configObject = recursivelySubstitute(yaml.parse(fs.readFileSync(filename, 'utf8')));
    if (validate(configObject)) return configObject;
    throw new Error('Invalid config provided (config failed JSON schema validation).');
}

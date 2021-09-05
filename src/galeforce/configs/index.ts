import yaml from 'yaml';
import fs from 'fs';
import process from 'process';
import Ajv, { JSONSchemaType } from 'ajv';
import * as TJS from 'typescript-json-schema';
import debug from 'debug';
import chalk from 'chalk';
import path from 'path';
import _ from 'lodash';
import { ConfigInterface } from '../interfaces/config';
import defaultConfig from './default';

const initDebug = debug('galeforce:init');

initDebug(`${chalk.bold('reading config interface and converting to JSON schema')}`);
const configInterfacePath = path.join(__dirname, '..', 'interfaces', 'config.d.ts');
const program: TJS.Program = TJS.getProgramFromFiles([configInterfacePath], { // extract a TJS.Program from the configuration type definition
    strictNullChecks: true,
});

// Generate JSON schema from the ConfigInterface interface
const ConfigSchema = TJS.generateSchema(program, 'ConfigInterface', { required: true }) as JSONSchemaType<ConfigInterface>;
const ajv = new Ajv();
export const validate = ajv.compile(ConfigSchema); // Function validating a provided configuration object against valid field types

/**
 *
 * @param {string} filename The filename of the config file.
 *
 * @return {ConfigInterface} The corresponding config object.
 */
export function getConfig(filename: string): object {
    const configObject = _.cloneDeepWith(yaml.parse(fs.readFileSync(filename, 'utf8')), (value: unknown) => {
        if (typeof value === 'string') {
            try {
                return _.template(value)(process.env); // Substitute template string-like values with values in process.env
            } catch (e) {
                if (e instanceof Error) {
                    // Throw if a required template string value is not present.
                    throw new Error(`[galeforce]: process.env.${e.message.split(' ')[0]} is required in config file but is undefined.`);
                } else {
                    throw new Error(`[galeforce]: Config failed to process.`)
                }
            }
        }
    });

    return configObject;
}

export function mergeWithDefaultConfig(config: object): ConfigInterface {
    return _.merge({}, defaultConfig, config); // Merge the provided config object with the default object.
}

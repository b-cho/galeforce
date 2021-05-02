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

const initDebug = debug('galeforce:init');

initDebug(`${chalk.bold('reading config interface and converting to JSON schema')}`);
const configInterfacePath = path.join(__dirname, '..', 'interfaces', 'config.d.ts');
const program: TJS.Program = TJS.getProgramFromFiles([configInterfacePath]);
const ConfigSchema = TJS.generateSchema(program, 'ConfigInterface', { required: true }) as JSONSchemaType<ConfigInterface>;

const ajv = new Ajv();
export const validate = ajv.compile(ConfigSchema);

/**
 *
 * @param {string} filename The filename of the config file.
 *
 * @return {ConfigInterface} The corresponding config object.
 */
export function getConfig(filename: string): ConfigInterface {
    const configObject = _.cloneDeepWith(yaml.parse(fs.readFileSync(filename, 'utf8')), (value: any) => {
        if(typeof value === 'string') {
            try {
                return _.template(value)(process.env);
            } catch (e) {
                throw new Error(`[galeforce]: process.env.${e.message.split(' ')[0]} is required in config file but is undefined.`);
            }
        }
    });
    
    if (validate(configObject)) return configObject;
    throw new Error('Invalid config provided (config failed JSON schema validation).');
}

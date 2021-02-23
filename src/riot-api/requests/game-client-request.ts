import axios from 'axios';
import debug from 'debug';
import chalk from 'chalk';
import https from 'https';
import fs from 'fs';
import path from 'path';
import Request from './request';

const requestDebug = debug('galeforce:riot-api');
const initDebug = debug('galeforce:init');

initDebug(`${chalk.bold('loading Game Client certificate chain')}`);
const httpsAgent = new https.Agent({ ca: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'resource', 'riotgames.pem')) });

export default class GameClientRequest extends Request {
    constructor(URLTemplate: string, parameters: Record<string, unknown>, query: object, body: object) {
        super(Request.generateTemplateString(URLTemplate, parameters), {}, query, body);
    }

    public async get(): Promise<object> {
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('GET')} \u00AB ${chalk.bold('query')} %O`, this.query);
        return axios.get(encodeURI(this.targetURL), {
            headers: this.headers,
            params: this.query,
            httpsAgent,
        });
    }
}

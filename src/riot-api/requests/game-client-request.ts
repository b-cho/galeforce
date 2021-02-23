import debug from 'debug';
import chalk from 'chalk';
import https from 'https';
import fs from 'fs';
import path from 'path';
import Request from './request';

const initDebug = debug('galeforce:init');

initDebug(`${chalk.bold('loading Game Client certificate chain')}`);
const httpsAgent = new https.Agent({ ca: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'resource', 'riotgames.pem')) });

export default class GameClientRequest extends Request {
    constructor(URLTemplate: string, parameters: Record<string, unknown>, query: object, body: object) {
        super(Request.generateTemplateString(URLTemplate, parameters), body, {
            params: query,
            httpsAgent,
        });
    }
}

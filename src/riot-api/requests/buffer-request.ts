import Request from './request';
import axios from 'axios';
import debug from 'debug';
import chalk from 'chalk';

const requestDebug = debug('galeforce:riot-api');

export default class BufferRequest extends Request {
    public async get(): Promise<object> {
        requestDebug(`${chalk.italic(this.targetURL)} | ${chalk.bold.green.inverse('GET')} \u00AB ${chalk.bold('query')} %O`, this.query);
        return axios.get(encodeURI(this.targetURL), {
            headers: this.headers,
            params: this.query,
            responseType: 'arraybuffer',
        });
    }
    constructor(key: string, URLTemplate: string, parameters: Record<string, unknown>, query: object, body: object) {
        super(Request.generateTemplateString(URLTemplate, parameters), { 'X-Riot-Token': key }, query, body);
    }
}

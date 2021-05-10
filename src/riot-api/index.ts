import _ from 'lodash';
import https from 'https';
import fs from 'fs';
import path from 'path';
import debug from 'debug';
import chalk from 'chalk';
import * as ENDPOINTS from './enums/endpoints';
import {
    Region, LeagueRegion, RiotRegion, ValorantRegion, DataDragonRegion,
} from './enums/regions';
import { Queue, LeagueQueue, ValorantQueue } from './enums/queues';
import { Tier } from './enums/tiers';
import { Division } from './enums/divisions';
import { Game } from './enums/games';
import Request from './requests';

const initDebug = debug('galeforce:init');

initDebug(`${chalk.bold('loading Game Client certificate chain')}`);
const httpsAgent = new https.Agent({ ca: fs.readFileSync(path.join(__dirname, '..', '..', 'resource', 'riotgames.pem')) });

export class RiotAPIModule {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    /**
     * @private
     *
     * @param {String} template A list of string templates that are filled in with parameters.
     * @param {Object} match Parameters to fill in variables for the string templates.
     *
     * @return {[String]} Substituted version of template with parameter values from match.
     */
    protected generateTemplateString(template: string, match: Record<string, unknown>): string {
        try {
            return _.template(template)(_.mapValues(match, (v) => { // Encode the components of the target URL (using values from the payload)
                if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                    return encodeURIComponent(v);
                }
                return v;
            }));
        } catch (e) {
            throw new Error(`[galeforce]: Action payload ${e.message.split(' ')[0]} is required but undefined.`);
        }
    }

    public request(stringTemplate: string, parameters: Record<string, unknown>, query: object = {}, body: object = {}): Request {
        return new Request(this.generateTemplateString(stringTemplate, parameters), body, {
            params: query,
            headers: { 'X-Riot-Token': this.key },
        });
    }

    public gcRequest(stringTemplate: string, parameters: Record<string, unknown>, query: object = {}, body: object = {}): Request {
        return new Request(this.generateTemplateString(stringTemplate, parameters), body, {
            params: query,
            httpsAgent,
        });
    }

    public bufferRequest(stringTemplate: string, parameters: Record<string, unknown>, query: object = {}, body: object = {}): Request {
        return new Request(this.generateTemplateString(stringTemplate, parameters), body, {
            params: query,
            responseType: 'arraybuffer',
        });
    }
}

export {
    ENDPOINTS, Region, LeagueRegion, RiotRegion, ValorantRegion, DataDragonRegion,
    Queue, LeagueQueue, ValorantQueue, Tier, Division, Game,
};

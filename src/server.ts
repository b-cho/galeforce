/* eslint-disable consistent-return */
/*
    This is the main server file that is used to make the Rubidium
    library forward-facing.
*/

import express from 'express';
import helmet from 'helmet';
import minimist from 'minimist';
import process from 'process';
import XRegExp from 'xregexp';
import RubidiumModule, { getConfig } from './rubidium';
import ConfigInterface from './rubidium/interfaces/config';
import SummonerInterface from './rubidium/interfaces/summoner';

const argv = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Rubidium: RubidiumModule = new RubidiumModule(config);
const app = express();

app.use(helmet());

app.get('/v2/summoner/update', async (request, response) => {
    const server: string | null = request.query.server;
    const username: string | null = request.query.username;
    const queryLimit: number | null = config['riot-api'].query;

    // Input checks
    if (server == null || username == null || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        return response.sendStatus(400); // handle bad input data
    }

    let summonerData;
    if (queryLimit != null) {
        summonerData = await Rubidium.summoner.fetch.byName(server, username, queryLimit).run();
    } else {
        summonerData = await Rubidium.summoner.fetch.byName(server, username).run();
    }
    await Rubidium.summoner.set(summonerData).run();
    response.sendStatus(200);
});

app.get('/v2/summoner/get', async (request, response) => {
    const server: string | null = request.query.server;
    const username: string | null = request.query.username;

    // Input checks
    if (server == null || username == null || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        // handle bad input data
        return response.sendStatus(400);
    }

    const summonerData: SummonerInterface[] = await Rubidium.summoner.filter({
        'summoner.name': username,
        'summoner.server': server,
    }).run();
    response.json(summonerData);
});

Rubidium.init().then(() => {
    app.listen(config.system.port); // Don't listen for connections until Rubidium initializes.
});

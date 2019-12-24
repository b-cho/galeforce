/* eslint-disable consistent-return */
/*
    This is the main server file that is used to make the Sightstone
    library forward-facing.
*/

import express from 'express';
import helmet from 'helmet';
import minimist from 'minimist';
import process from 'process';
import XRegExp from 'xregexp';
import SightstoneModule, { getConfig } from './sightstone';
import ConfigInterface from './sightstone/interfaces/config';
import SummonerInterface from './sightstone/interfaces/summoner';

const argv = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Sightstone: SightstoneModule = new SightstoneModule(config);
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

    try {
        let summonerData;
        if (queryLimit != null) {
            summonerData = await Sightstone.summoner.fetch.byName(server, username, queryLimit).run();
        } else {
            summonerData = await Sightstone.summoner.fetch.byName(server, username).run();
        }
        await Sightstone.summoner.upsert(summonerData).run();
        response.sendStatus(200);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/v2/summoner/get', async (request, response) => {
    const server: string | null = request.query.server;
    const username: string | null = request.query.username;

    // Input checks
    if (server == null || username == null || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        // handle bad input data
        return response.sendStatus(400);
    }

    try {
        const summonerData: SummonerInterface[] = await Sightstone.summoner.filter({
            'summoner.name': username,
            'summoner.server': server,
        }).run();
        response.json(summonerData);
    } catch (e) {
        response.sendStatus(500);
    }
});

Sightstone.init().then(() => {
    app.listen(config.system.port); // Don't listen for connections until Sightstone initializes.
});

/* eslint-disable consistent-return */
/*
    This is the main server file that is used to make the Sightstone
    library forward-facing.
*/

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import minimist from 'minimist';
import process from 'process';
import XRegExp from 'xregexp';
import async from 'async';
import SightstoneModule, { getConfig } from '../sightstone';
import ConfigInterface from '../sightstone/interfaces/config';
import SummonerInterface from '../sightstone/interfaces/summoner';
import MatchInterface from '../sightstone/interfaces/match';

const argv = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Sightstone: SightstoneModule = new SightstoneModule(config);
const app = express();

app.use(helmet());
app.use(cors());

app.get('/v2/summoner/update', async (request, response) => {
    const server: string | null = request.query.server;
    const username: string | null = request.query.username;
    const queryLimit: number | null = config['riot-api'].query;

    // Input checks
    if (server === null || username === null || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        return response.sendStatus(400); // handle bad input data
    }

    try {
        let summonerData: SummonerInterface;
        if (queryLimit !== null) summonerData = await Sightstone.summoner.fetch.byName(server, username, queryLimit).run();
        else summonerData = await Sightstone.summoner.fetch.byName(server, username).run();
        Sightstone.summoner.upsert(summonerData).run();

        // Update matches into database as well
        async.eachSeries(summonerData.matchlist.matches, async (match, callback) => {
            const matchData = await Sightstone.match.fetch.byMatchId(match.platformId, match.gameId).run();
            Sightstone.match.upsert(matchData).run();
            callback(null);
        });
        response.sendStatus(200);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/v2/summoner/get', async (request, response) => {
    const server: string | null = request.query.server;
    const username: string | null = request.query.username;

    // Input checks
    if (server === null || username === null || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        // handle bad input data
        return response.sendStatus(400);
    }

    try {
        const summonerData: SummonerInterface[] = await Sightstone.summoner.filter({
            'summoner.name': username,
            'summoner.server': server,
        }).run();
        response.status(200).json(summonerData);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/v2/match/get', async (request, response) => {
    const server: string | null = request.query.server;
    const id: string | null = request.query.id;

    // Input checks
    if (server === null || id === null || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9]+$').test(id))) {
        // handle bad input data
        return response.sendStatus(400);
    }

    try {
        const matchData: MatchInterface[] = await Sightstone.match.filter({
            gameId: id,
            platformId: server.toUpperCase(),
        }).run();
        response.status(200).json(matchData);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/v2/mastery-leaderboard/', async (request, response) => {
    const id: number | null = request.query.name ? await Sightstone.internal.championToId(request.query.name).run() : parseInt(request.query.id, 10);

    if (id === null || id === 0 || Number.isNaN(id)) {
        return response.sendStatus(400);
    }

    try {
        const masteryLeaderboard: object[] = await Sightstone.analysis.mastery.getLeaderboard([id]).run();
        response.status(200).json(masteryLeaderboard);
    } catch (e) {
        response.sendStatus(500);
    }
});

Sightstone.init().then(() => {
    console.log('[server]: Listening on port', config.system.port);
    app.listen(config.system.port); // Don't listen for connections until Sightstone initializes.
});

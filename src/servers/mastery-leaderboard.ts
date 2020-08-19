/* eslint-disable consistent-return */
/*
    This is the server file used for the sample mastery-leaderboard project.
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

const argv = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Sightstone: SightstoneModule = new SightstoneModule(config);
const app = express();

const globalLeaderboard: any = {};

app.use(helmet());
app.use(cors());

app.get('/update', async (request, response) => {
    const server: string | undefined = request.query.server?.toString();
    const username: string | undefined = request.query.username?.toString();
    const queryLimit: number | null = config['riot-api'].query;

    // Input checks
    if (server === undefined || username === undefined || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        return response.sendStatus(400); // handle bad input data
    }

    try {
        let summonerData: SummonerInterface;
        if (queryLimit !== null) summonerData = await Sightstone.summoner.fetch.byName(server, username, queryLimit).run();
        else summonerData = await Sightstone.summoner.fetch.byName(server, username).run();
        Sightstone.summoner.upsert(summonerData).run();
        // Update matches into database as well
        async.each(summonerData.matchlist.matches, async (match, callback) => {
            const matchData = await Sightstone.match.fetch.byMatchId(match.platformId, match.gameId).run();
            Sightstone.match.upsert(matchData).run();
            callback(null);
        });
        response.sendStatus(200);
    } catch (e) {
        console.log('Update failed with error', e);
        response.sendStatus(500);
    }
});

app.get('/mastery/distribution', async (request, response) => {
    try {
        let responseValue: any = {};

        Object.keys(globalLeaderboard).forEach((champion: string) => {
            const masteryPoints: number[] = globalLeaderboard[champion].map((item: any) => item.masteryPoints);
            const binSize: number = 25000;
            let masteryHistogram = new Array(1000000/binSize + 1).fill(0);

            masteryPoints.forEach((value: number) => {
                masteryHistogram[Math.min(Math.floor(value/binSize), 200)] += 1;
            })
            responseValue[champion] = masteryHistogram;
        });

        response.status(200).json(responseValue);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/mastery/ranking', async (request, response) => {
    try {
        const username: string | undefined = request.query.username?.toString();
        const server: string | undefined = request.query.server?.toString();

        if (server === undefined || username === undefined || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
            return response.sendStatus(400); // handle bad input data
        }

        const responseValue: any = {};
        Object.keys(globalLeaderboard).forEach((ls) => {
            responseValue[ls] = {
                pos: -1,
                total: globalLeaderboard[ls].length,
                points: 0,
                level: 0,
                time: 0,
            };
            globalLeaderboard[ls].forEach((item: any, index: number) => {
                if (item.name === username && item.server === server) {
                    responseValue[ls].pos = index + 1;
                    responseValue[ls].points = item.masteryPoints;
                    responseValue[ls].level = item.masteryLevel;
                    responseValue[ls].time = item.lastPlayTime;
                }
            });
        });
        response.status(200).json(responseValue);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/mastery/leaderboard', async (request, response) => {
    try {
        const responseValue: any = {};
        Object.keys(globalLeaderboard).forEach((key: string) => {
            responseValue[key] = globalLeaderboard[key].slice(0, 100);
        });
        response.status(200).json(responseValue);
    } catch (e) {
        response.sendStatus(500);
    }
});

async function updateGlobalLeaderboard(): Promise<void> {
    console.log('[server] [global-leaderboard]: Updating global leaderboard...');
    let champData: any = Sightstone.internal.json.champion() as any;
    champData = Object.values(champData.data);
    const MLB: object[] = await Sightstone.analysis.mastery.getLeaderboard(champData.map((a: any) => parseInt(a.key, 10))).run();

    champData.map((a: any) => a.name).forEach((name: string, index: number) => {
        globalLeaderboard[name] = MLB[index];
    });
    console.log('[server] [global-leaderboard]: Finished updating all champions. Setting timer for recalculation.');
    setTimeout(updateGlobalLeaderboard, 60 * 1000); // Update once per minute
}

Sightstone.init().then(async () => {
    await updateGlobalLeaderboard();
    console.log('[server] [network]: Listening on port', config.system.port);
    app.listen(config.system.port); // Don't listen for connections until Sightstone initializes.
});

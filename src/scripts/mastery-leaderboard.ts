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
import _ from 'lodash';
import SightstoneModule, { getConfig } from '../sightstone';
import ConfigInterface from '../sightstone/interfaces/config';
import SummonerInterface from '../sightstone/interfaces/summoner';
import MatchInterface from '../sightstone/interfaces/match';

const argv = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Sightstone: SightstoneModule = new SightstoneModule(config);
const app = express();

const globalMasteryLeaderboard: any = {};
const globalRankedLeaderboard: any = {};

app.use(helmet());
app.use(cors());

app.get('/update', async (request, response) => {
    const server: string | undefined = request.query.server?.toString();
    const username: string | undefined = request.query.username?.toString().toLowerCase().replace(/\s/g, '');
    const queryLimit: number | null = config['riot-api'].query;

    // Input checks
    if (server === undefined || username === undefined || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        return response.sendStatus(400); // handle bad input data
    }

    try {
        let summonerData: SummonerInterface;
        if (queryLimit !== null) summonerData = await Sightstone.summoner.fetch.byName(server, username, queryLimit).run();
        else summonerData = await Sightstone.summoner.fetch.byName(server, username).run();
        await Sightstone.summoner.upsert(summonerData).run();
        // Update matches into database as well
        await async.each(summonerData.matchlist.matches, async (match) => {
            const matchData = await Sightstone.match.fetch.byMatchId(match.platformId, match.gameId).run();
            await Sightstone.match.upsert(matchData).run();
        });
        response.sendStatus(200);
    } catch (e) {
        response.sendStatus(e.response?.status || 500);
    }
});

app.get('/summoner', async (request, response) => {
    const server: string | undefined = request.query.server?.toString();
    const username: string | undefined = request.query.username?.toString().toLowerCase().replace(/\s/g, '');
    const queryLimit: number | null = config['riot-api'].query;

    if (server === undefined || username === undefined || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        // handle bad input data
        return response.sendStatus(400);
    }

    try {
        const summonerData: SummonerInterface[] = await Sightstone.summoner.filter({
            'summoner.name': new RegExp(username.split("").join("\\s*"), 'iu'),
            'summoner.server': server,
        }).run();
        response.status(200).json(summonerData[0]);
    } catch (e) {
        response.sendStatus(e.response?.status || 500);
    }
});

app.get('/mastery/distribution', async (request, response) => {
    try {
        let responseValue: any = {};

        Object.keys(globalMasteryLeaderboard).forEach((champion: string) => {
            const masteryPoints: number[] = globalMasteryLeaderboard[champion].map((item: any) => item.masteryPoints);
            let masteryHistogram = new Array(500000/10000 + 1).fill(0);

            masteryPoints.forEach((value: number) => {
                masteryHistogram[Math.min(Math.floor(value/10000), masteryHistogram.length-1)] += 1;
            });
            let xAxis = Array.from(Array(500000/10000 + 1).keys()).map(x => 10000*x);

            let data = xAxis.map((value, index) => {
                return {
                    x: value,
                    y: masteryHistogram[index],
                }
            });

            responseValue[champion] = data;
        });

        response.status(200).json(responseValue);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/mastery/ranking', async (request, response) => {
    try {
        const username: string | undefined = request.query.username?.toString().toLowerCase().replace(/\s/g, '');
        const server: string | undefined = request.query.server?.toString();

        if (server === undefined || username === undefined || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
            return response.sendStatus(400); // handle bad input data
        }

        const responseValue: any = {};
        Object.keys(globalMasteryLeaderboard).forEach((ls) => {
            responseValue[ls] = {
                pos: -1,
                total: globalMasteryLeaderboard[ls].length,
                points: 0,
                level: 0,
                time: 0,
            };
            globalMasteryLeaderboard[ls].forEach((item: any, index: number) => {
                if (item.lowerName === username && item.server === server) {
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

app.get('/league/ranking', async (request, response) => {
    try {
        const username: string | undefined = request.query.username?.toString().toLowerCase().replace(/\s/g, '');
        const server: string | undefined = request.query.server?.toString();

        if (server === undefined || username === undefined || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
            return response.sendStatus(400); // handle bad input data
        }

        const responseValue: any = {};
        Object.keys(globalRankedLeaderboard).forEach((ls) => {
            responseValue[ls] = {
                pos: -1,
                total: globalRankedLeaderboard[ls].filter((x: any) => x.server == server).length,
                tier: "",
                rank: "",
                leaguePoints: 0,
            };
            globalRankedLeaderboard[ls].filter((x: any) => x.server == server).forEach((item: any, index: number) => {
                if (item.lowerName === username && item.server === server) {
                    responseValue[ls].pos = index + 1;
                    responseValue[ls].tier = item.tier;
                    responseValue[ls].rank = item.rank;
                    responseValue[ls].leaguePoints = item.leaguePoints;
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
        Object.keys(globalMasteryLeaderboard).forEach((key: string) => {
            responseValue[key] = globalMasteryLeaderboard[key].slice(0, 100);
        });
        response.status(200).json(responseValue);
    } catch (e) {
        response.sendStatus(500);
    }
});

app.get('/social/frequent', async (request, response) => {
    const server: string | undefined = request.query.server?.toString();
    const username: string | undefined = request.query.username?.toString();

    if (server === undefined || username === undefined || !(config['riot-api'].servers.includes(server)) || !(XRegExp('^[0-9\\p{L} _\\.]+$').test(username))) {
        return response.sendStatus(400); // handle bad input data
    }

    const summonerData: SummonerInterface[] = await Sightstone.summoner.filter({
        'summoner.name': new RegExp(username.split("").join("\\s*"), 'iu'),
        'summoner.server': server,
    }).run();

    const matchData: MatchInterface[] = await Sightstone.match.filter({
        'participantIdentities.player.accountId': summonerData[0].summoner.accountId,
    }).run();

    const participantByMatch: any[] = matchData.map((match: MatchInterface) => {
        return match.participantIdentities;
    }).flat().map((participant: any) => {
        return participant.player.summonerName;
    });

    const frequencies: object = _.countBy(participantByMatch);

    const frequents: string[] = Object.keys(_.pickBy(frequencies, (value: number) => {
        return value > 1;
    }));

    response.status(200).json({
        nodes: frequents.map((key: string) => {
            return {
                "id": key,
                "server": summonerData[0].summoner.server,
            }
        }),
        links: frequents.map((key: string) => {
            return {
                "source": summonerData[0].summoner.name,
                "target": key
            }
        }),
    });
});

async function updateGlobalLeaderboards(): Promise<void> {
    console.log(`[${new Date().toLocaleString()}] [server] [global-leaderboard]: Updating global ranked leaderboards...`);
    const RLB: any = await Sightstone.analysis.ranked.getLeaderboard(['RANKED_SOLO_5x5', 'RANKED_FLEX_SR']).run();
    ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'].forEach((name: string, index: number) => {
        globalRankedLeaderboard[name] = RLB[index].map((entry: any) => {
            entry.lowerName = entry.name.toLowerCase().replace(/\s/g, '');
            return entry;
        });
    });

    console.log(`[${new Date().toLocaleString()}] [server] [global-leaderboard]: Updating global mastery leaderboards...`);
    let champData: any = Sightstone.internal.json.champion() as any;
    champData = Object.values(champData.data);
    const MLB: any = await Sightstone.analysis.mastery.getLeaderboard(champData.map((a: any) => parseInt(a.key, 10))).run();

    champData.map((a: any) => a.name).forEach((name: string, index: number) => {
        //console.log(MLB[index]);
        globalMasteryLeaderboard[name] = MLB[index].map((entry: any) => {
            entry.lowerName = entry.name.toLowerCase().replace(/\s/g, '');
            return entry;
        });
    });

    console.log(`[${new Date().toLocaleString()}] [server] [global-leaderboard]: Finished updating all leaderboards. Setting timer for recalculation.`);
    setTimeout(updateGlobalLeaderboards, 20 * 1000); // Update once per 20 seconds
}

Sightstone.init().then(async () => {
    await updateGlobalLeaderboards();
    console.log('[server] [network]: Listening on port', config.system.port);
    app.listen(config.system.port); // Don't listen for connections until Sightstone initializes.
});

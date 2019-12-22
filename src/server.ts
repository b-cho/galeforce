/*
    This is the main server file that is used to make the Rubidium
    library forward-facing.
*/

import express from "express";
import helmet from "helmet";
import minimist from "minimist";
import process from "process";
import RubidiumModule, { getConfig } from "./rubidium";
import ConfigInterface from "./rubidium/interfaces/config";
import XRegExp from "xregexp";

const argv: any = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Rubidium: RubidiumModule = new RubidiumModule(config);
const app: any = express();
app.use(helmet());

app.get('/v2/summoner/update', async (request: any, response: any) => {
    console.log('/v2/summoner/update');

    let server: string | null = request.query.server;
    let username: string | null = request.query.username;
    let queryLimit: number | null = config["riot-api"].query;

    // Input checks
    if(server == null || username == null || !(config["riot-api"].servers.includes(server)) || !(XRegExp("^[0-9\\p{L} _\\.]+$").test(username))) {
        // handle bad input data
        return response.sendStatus(400);
    }

    let summonerData;
    if(queryLimit != null) {
        summonerData = await Rubidium.summoner.fetch.byName(server, username, queryLimit).run();
    } else {
        summonerData = await Rubidium.summoner.fetch.byName(server, username).run();
    }
    await Rubidium.summoner.set(summonerData).run();
    response.sendStatus(200);
});

app.get('/v2/summoner/get', async (request: any, response: any) => {
    console.log('/v2/summoner/get');

    let server: string | null = request.query.server;
    let username: string | null = request.query.username;

    // Input checks
    if(server == null || username == null || !(config["riot-api"].servers.includes(server)) || !(XRegExp("^[0-9\\p{L} _\\.]+$").test(username))) {
        // handle bad input data
        return response.sendStatus(400);
    }

    let summonerData = await Rubidium.summoner.filter({
        'summoner.name': username,
        'summoner.server': server
    }).run();
    response.json(summonerData);
});

Rubidium.init().then(() => {
    app.listen(config.system.port); // Don't listen for connections until Rubidium initializes.
});



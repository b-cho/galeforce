/* require() calls */
const http    = require("http");
const https   = require("https");
const os      = require("os");
const process = require("process");
const fs      = require("fs");
const express = require("express");
const async   = require("async");
const MongoDB = require("mongodb");
const ip      = require("ip");
const XRegExp = require("xregexp");

const Rubidium = require("./rubidium-engine").Rubidium;
const config   = require("./config.json");

const SERVER_IP  = config.system.host == null ? ip.address() : config.system.host; // set to local IP if null.
const HTTP_PORT  = config.system.http_port; // HTTP port
const HTTPS_PORT = config.system.https_port; // HTTPS port
const USE_HTTP   = config.system.use_http; // Use HTTP at all?
const USE_HTTPS  = config.system.use_https; // Use HTTPS at all?
var   URI        = config.mongoDB.uri;

const HTTPS_OPTIONS = {
	key: fs.readFileSync("./cert/key.pem"),
	cert: fs.readFileSync("./cert/cert.pem")
};

var MongoClient = MongoDB.MongoClient;

var summoner_regex = XRegExp("^[0-9\\p{L} _\\.]+$");
/* Get datetime as a string */
function getTime(){
	return new Date().getTime();
}

/* Express Variables */
const app = express(); // Create Express app.

/* API call queue for rate limiting */
var api_queue = [];

/* Express Request Handlers */
app.get("/summoner/update", (request, response) => {
    console.log("GET", request.url);
    /* Initialize GET variables */
    response.set("Content-Type", "application/json"); // Set response header to JSON.
    response.set("Access-Control-Allow-Origin", "*"); // Set Access-Control header.
    let requestInfo = {};
    let timeRecv = getTime();

    let updatePromise = new Promise((resolve, reject) => {
        if(!(config.riotAPI.servers.includes(request.query.server)) || request.query.username == null || !(summoner_regex.test(request.query.username))){ // Verify parameters are correct and defined
            response.status(400); // Invalid query parameters.
            reject({"body": {"statusCode": 400, "reason": "Invalid parameters"}});
            return;
        }

        Rubidium.update({"server": request.query.server, "summoner-name": request.query.username}).then((data) => {
            resolve(); // Resolve promise.
        }).catch((reason) => {
            reject(reason); // If error, reject promise with reason.
        });
    }).then(() => {
        requestInfo.error = {}; // No error.
        requestInfo.statusCode = response.statusCode; // Set requestInfo status code.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        const responseJSON = {requestInfo}; // Create response body.
        response.send(JSON.stringify(responseJSON)); // Write HTTP response.
    }).catch((error) => {
        if(!error.body) error.body = {};
        if(!error.response) error.response = {};
        response.status(500);
        requestInfo.error = error; // Pass error along into requestInfo.
        requestInfo.statusCode = response.statusCode; // Pass status code as well.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        delete error.headers;
        const responseJSON = {requestInfo}; // Create response body
        response.send(JSON.stringify(responseJSON)); // Write HTTP response.
    });
});

app.get("/summoner/get", (request, response) => {
    console.log("GET", request.url);
    response.set("Content-Type", "application/json"); // Set response header to JSON.
    response.set("Access-Control-Allow-Origin", "*"); // Set Access-Control header.

    let requestInfo = {};
    let timeRecv = getTime();
    let getPromise = new Promise((resolve, reject) => {
        if(!(config.riotAPI.servers.includes(request.query.server)) || request.query.username == null || !(summoner_regex.test(request.query.username))){ // Verify parameters are correct and defined
            response.status(400); // Invalid query parameters.
            reject({"body": {"statusCode": 400, "reason": "Invalid parameters"}});
            return;
        }

        let return_data = {"summoner": null, "match": []}; // Default values

        MongoClient.connect(URI, (err, db) => {
            if (err) reject(err);
            let summoner_db = db.collection("summoner-data"); // Create database "references"
            let match_db = db.collection("match-data"); // ^^
            let fetchDataPromise = new Promise(async (resolve, reject) => {
                console.log("QUERY summoner_db", request.query);
                return_data.summoner = await summoner_db.find({"custom.unique_name": request.query.username.replace(/\s/g, "").toLowerCase(), "summoner.server": request.query.server}).toArray();
                resolve();
            }).then(async () => {
                for(const summoner_iter of return_data.summoner) { // For async support
                    for(const match of summoner_iter.matches.matches) {
                        console.log("QUERY match_db   ", {'gameId': match.gameId});
                        let match_data = await match_db.find({"gameId": match.gameId}).toArray();
                        return_data.match = return_data.match.concat(match_data);
                    };
                };
                return;
            }).then(() => {
                resolve(return_data);
            });
        });
    }).then((data) => {
        requestInfo.error = {}; // No error.
        requestInfo.statusCode = response.statusCode; // Set requestInfo status code.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        const responseJSON = {requestInfo, data}; // Create response body.
        response.send(JSON.stringify(responseJSON)); // Write HTTP response.
    }).catch((error) => {
        let data = {};
        if(!error.body) error.body = {};
        if(!error.response) error.response = {};
        response.status(500);
        requestInfo.error = error; // Pass error along into requestInfo.
        requestInfo.statusCode = response.statusCode; // Pass status code as well.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        delete error.headers;
        const responseJSON = {requestInfo, data}; // Create response body
        response.send(JSON.stringify(responseJSON)); // Write HTTP response.
    });
});

app.all("*", (request, response) => {
    console.log("GET", request.url);
    response.set("Access-Control-Allow-Origin", "*"); // Set Access-Control header.
	response.sendStatus(404); // Default router -- send 404 because it doesn't exist.
});

/* Information Code */
console.log("--- Node.js Info ---");
console.log(`Current time: ${getTime()}`); // Print datetime
console.log("Node version:", process.version); // Print node version
console.log("Server IP:", SERVER_IP);
USE_HTTP ? console.log("HTTP port:", HTTP_PORT) : console.log("HTTP port: N/A"); // Print port
USE_HTTPS ? console.log("HTTPS port:", HTTPS_PORT) : console.log("HTTPS port: N/A"); // Print port
console.log("--- System Info ---");
console.log("OS Version:", os.type(), os.release());
console.log("--- Console Output ---");

/* Executed Code */
if(USE_HTTP)  http.createServer(app).listen(HTTP_PORT); // Listen on port specified.
if(USE_HTTPS) https.createServer(HTTPS_OPTIONS, app).listen(HTTPS_PORT); // Listen on port specified.

/* Error handlers */
process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled promise rejection at promise", p, "with reason", reason);
});

// /* API processing loop w/ rate limit handling */
// async.forever((next) => {
//     if(api_queue.length == 0) next();
//     console.log(api_queue.length);
//     api_queue[0]().catch((error) => {
//         console.log(error);
//     });
//     next();
// }, (error) => {
//     console.log(error);
// });
/* require() calls */
const http       = require("http");
const os         = require("os");
const process    = require("process");
const fs         = require("fs");
const express    = require("express");
const async      = require("async");
const MongoDB    = require("mongodb");
const ip         = require("ip");
const XRegExp    = require("xregexp");
const bodyParser = require("body-parser");
const request    = require("request");
const helmet     = require("helmet");
const yaml       = require("yaml");
const argv       = require("minimist")(process.argv.slice(2)); // Take the actual arguments to the file

const Rubidium = require("./rubidium-engine");
const config   = yaml.parse(fs.readFileSync(argv.config, "utf8"));

const SERVER_IP  = config.system.host; // set to local IP if null.
const HTTP_PORT  = config.system.port; // HTTP port
var   URI        = config["mongo-db"].uri;

var MongoClient = MongoDB.MongoClient;

var summoner_regex = XRegExp("^[0-9\\p{L} _\\.]+$");
/* Get datetime as a string */
function getTime(){
	return new Date().getTime();
}

/* Recursively convert all valid fields in inp to their integer variants */
function objectToInt(inp) {
    if(Array.isArray(inp)) {
        let ret = []
        inp.forEach((elem) => {
            if(Array.isArray(elem)) elem.map(x => objectToInt(x));
            else if (typeof elem == "object") elem = objectToInt(elem);
            else if(/^\d+$/.test(elem)) elem = parseInt(elem);
            else if(/^\d+\.\d+$/.test(elem)) elem = parseFloat(elem);
            ret.push(elem);
        });
        return ret;
    } else {
        Object.keys(inp).forEach((key) => { // convert stringed floats/ints to original type
            if(Array.isArray(inp[key])) inp[key] = inp[key].map(x => objectToInt(x));
            else if (typeof inp[key] == "object") inp[key] = objectToInt(inp[key]);
            else if(/^\d+$/.test(inp[key])) inp[key] = parseInt(inp[key]);
            else if(/^\d+\.\d+$/.test(inp[key])) inp[key] = parseFloat(inp[key]);
        });
        return inp;
    }
}

/* Express Variables */
const app = express(); // Create Express app.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // Use body-parser in JSON middleware.
app.use(helmet());

/* Upon server setup... */
// Taken from https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries

console.log("Downloading data from Riot CDNs...");
async.each(config.startup.download, (link, callback) => {
    let fl = link[0];
    let url = link[1];
    let stream = request.get(url).on('response', (response) => {
        console.log("Downloading", url, "->", fl);
        console.log(response.statusCode);
    }).pipe(fs.createWriteStream(fl));  
    stream.on('finish', callback);
}, (err) => {
    if(err) console.log(err);
    Rubidium.init(argv.config, argv.endpoints);
});

/* Express Request Handlers */
app.get("/v1/summoner/update", (request, response) => {
    console.log("GET", request.url);
    /* Initialize GET variables */
    response.set("Content-Type", "application/json"); // Set response header to JSON.
    response.set("Access-Control-Allow-Origin", "*"); // Set response header to JSON.
    let requestInfo = {};
    let timeRecv = getTime();

    let updatePromise = new Promise((resolve, reject) => {
        if(!(config.riotAPI.servers.includes(request.query.server)) || request.query.username == null || !(summoner_regex.test(request.query.username))){ // Verify parameters are correct and defined
            response.status(400); // Invalid query parameters.
            return reject({"body": {"statusCode": 400, "reason": "Invalid parameters"}});
        }
        // Rubidium.update({"server": request.query.server, "summoner-name": request.query.username}).then(() => {
        //     resolve(); // Resolve promise.
        // }).catch((reason) => {
        //     reject(reason); // If error, reject promise with reason.
        // });
        Rubidium.update({"server": request.query.server, "summoner-name": request.query.username}); // Simply initiate promise without waiting.
        resolve();
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
        console.log(error);
        requestInfo.error = error; // Pass error along into requestInfo.
        requestInfo.statusCode = response.statusCode; // Pass status code as well.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        delete error.headers;
        const responseJSON = {requestInfo}; // Create response body
        response.send(JSON.stringify(responseJSON)); // Write HTTP response.
    });
});

app.get("/v1/summoner/get", (request, response) => {
    console.log("GET", request.url);
    response.set("Content-Type", "application/json"); // Set response header to JSON.
    response.set("Access-Control-Allow-Origin", "*"); // Set response header to JSON.

    let requestInfo = {};
    let timeRecv = getTime();
    let getPromise = new Promise((resolve, reject) => {
        if(!(config.riotAPI.servers.includes(request.query.server)) || request.query.username == null || !(summoner_regex.test(request.query.username))){ // Verify parameters are correct and defined
            return reject(400);
        }

        let ret_summoner_data;
        let ret_match_data = [];

        MongoClient.connect(URI, (err, db) => {
            if (err) reject(500);
            let summoner_db = db.db("test").collection("summoner-data"); // Create database "references"
            let match_db = db.db("test").collection("match-data"); // ^^
            let fetchDataPromise = new Promise(async (resolve, reject) => {
                console.log("QUERY summoner_db", request.query);
                ret_summoner_data = await summoner_db.find({"custom.unique_name": request.query.username.replace(/\s/g, "").toLowerCase(), "summoner.server": request.query.server}).project({_id: 0}).toArray();
                resolve();
            }).then(async () => {
                for(const summoner_iter of ret_summoner_data) { // For async support
                    for(const match of summoner_iter.matches.matches) {
                        console.log("QUERY match_db   ", {'gameId': match.gameId});
                        let match_data = await match_db.find({"gameId": match.gameId}).project({_id: 0}).toArray();
                        ret_match_data = ret_match_data.concat(match_data);
                    };
                };
                return;
            }).then(() => {
                resolve({...ret_summoner_data[0], full_matches: ret_match_data});
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
        response.status(error ? error : 500);
        requestInfo.statusCode = response.statusCode; // Pass status code as well.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        delete error.headers;
        const responseJSON = {requestInfo, data}; // Create response body
        response.send(JSON.stringify(responseJSON)); // Write HTTP response.
    });
});

app.post("/v1/filter", (request, response) => {
    console.log("POST", request.url, request.body);
    response.set("Content-Type", "application/json"); // Set response header to JSON.
    response.set("Access-Control-Allow-Origin", "*"); // Set response header to JSON.

    let requestInfo = {};
    let timeRecv = getTime();

    // TODO: Make explicit method in rubidium-engine.js
    request.body.filter = objectToInt(request.body.filter);

    Rubidium.filterData(filter=request.body.filter, select=request.body.select).then((ts) => {
        requestInfo.error = {}; // No error.
        requestInfo.statusCode = response.statusCode; // Set requestInfo status code.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        let responseJSON = {requestInfo, "data": ts.comb};
        response.send(JSON.stringify(responseJSON));
    }).catch((error) => {
        response.status(500);
        requestInfo.error = error; // Pass error along into requestInfo.
        requestInfo.statusCode = response.statusCode; // Pass status code as well.
        requestInfo.time = {"recv": timeRecv, "sent": getTime()}; // Return timing.
        let data = {};
        let responseJSON = {requestInfo, data};
        response.send(JSON.stringify(responseJSON));
    });
});

app.all("*", (request, response) => {
    console.log("GET", request.url);
	response.sendStatus(404); // Default router -- send 404 because it doesn't exist.
});

/* Information Code */
console.log("--- Node.js Info ---");
console.log(`Current time: ${getTime()}`); // Print datetime
console.log("Node version:", process.version); // Print node version
console.log("Server IP:", SERVER_IP);
console.log("HTTP port:", HTTP_PORT); // Print port
console.log("--- System Info ---");
console.log("OS Version:", os.type(), os.release());
console.log("--- Console Output ---");

/* Executed Code */
http.createServer(app).listen(HTTP_PORT); // Listen on port specified.

/* Error handlers */
process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled promise rejection at promise", p, "with reason", reason);
});
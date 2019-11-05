/* require() calls */
const MongoDB    = require("mongodb");
const uuid       = require("uuid");
const async      = require("async");
const request    = require("request");
const Bottleneck = require("bottleneck");
const fs         = require("fs");

var config, endpoints;
var KEY, URI, LIMIT_CONFIG, MongoClient;
var limiter;

/* Define game data */
var championData = {};

// Modified slightly from https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
var generateTemplateString = (function() {
    var cache = {};
    function generateTemplate(template) {
        var fn = cache[template];
        if (!fn) {
            // Replace ${expressions} (etc) with ${map["expressions"]}.
            var sanitized = template
                            .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match) {
                                return `\$\{map\["${match.trim()}"\]\}`;
                            })
                            // Afterwards, replace anything that's not ${map["expressions"]}' (etc) with a blank string.
                             .replace(/(\$\{(?!map\[")[^\}]+"\]\})/g, '');
    
            fn = Function('map', `return \`${sanitized}\``);
        }
        return fn;
    }
    return generateTemplate;
})();

// Riot API direct call functions
class RiotAPI {
    /**
     * 
     * @param {[String]} str_templ A list of string templates that are filled in with parameters.
     * @param {Object} parameters Parameters to fill in variables for the string templates.
     * 
     * @return {[String]} Substituted version of str_templ with parameter values.
     */
    static generateEndpointURLs(str_templ, parameters) {
        var endpoints = [];
        str_templ.forEach(tpl => (endpoints.push(encodeURI(generateTemplateString(tpl)(parameters)))));
        return endpoints;
    }

    /**
     * @private
     * 
     * @param {[String]} endpoints Endpoints to fetch information from
     * 
     * @return {Promise} Return JSON data as a promise (because request completion is not instantaneous).
     */
    static _get(endpoints) {
        let return_promise = new Promise((resolve, reject) => {
            async.mapSeries(endpoints, (endpoint, callback) => { // fetch from API for each endpoint in list.
                let options = {
                    url: endpoint,
                    headers: {
                        "X-Riot-Token": KEY
                    },
                    json: true
                };
                limiter.submit(request.get, options, (err, response, body) => { // Directly rate limit the API call
                    if(err) return callback(err, null);
                    console.log(response.statusCode, !([200,404].includes(response.statusCode)), options.url);
                    if(!([200,404].includes(response.statusCode))) return callback({"body": {"statusCode": response.statusCode, "reason": response.statusMessage, "retry-after": response.headers["Retry-After"]}}, null);
                    return callback(null, body);
                });
            }, (err, result) => {
                if(err) return reject(err);
                if(result.length == 1) resolve(result[0]);
                else resolve(result);
            });
        });
        return return_promise;
    }

    /**
     * Fetches information from the Riot API given a list of endpoints.
     * This method is rate limited using the limiter defined above.
     * 
     * @param {[String]} endpoints Endpoints to fetch information from
     * 
     * @return {Promise} Return JSON data as a promise (because request completion is not instantaneous).
     */
    static get(endpoints) {
        return limiter.wrap(RiotAPI._get)(endpoints);
    }

    /** 
     * Convert integer to champion name.
     * 
     * @static
     * @param {Number} cid The id of the champion in question.
     * 
     * @return {String} The corresponding champion name.
    */
    static idToChampion(cid) {
        let ret = null;
        Object.keys(championData.data).forEach((k) => {
            if(parseInt(championData.data[k].key) == cid) {
                ret = k;
                return;
            }
        });
        return ret;
    }

    /** 
     * Convert champion name to integer.
     * 
     * @static
     * @param {Number} name The name of the champion in question.
     * 
     * @return {String} The corresponding champion ID.
    */
    static championToId(name) {
        name = name.replace(/[^A-Za-z]/g, '')
        return parseInt(championData.data[name].key);
    }
}

// Data analysis and database-push functions
class Rubidium {
    static init(config_path) {
        championData = require("../data/champion.json");

        config       = JSON.parse(fs.readFileSync(config_path));
        endpoints    = JSON.parse(fs.readFileSync(config.system.endpoints_json));


        KEY          = config.riotAPI.key;
        URI          = config.mongoDB.uri;
        LIMIT_CONFIG = config.bottleneck.parameters;
        MongoClient  = MongoDB.MongoClient;

        limiter = new Bottleneck(LIMIT_CONFIG);
    }  

    /** 
     * Fetch the data for the given parameters from the Riot API and update the MongoDB database online.
     * 
     * @static
     * @param {Object} params Argument for parameters like server, username, etc.
     *     {server: <server>, "summoner-name": <summoner name>}
     * 
     * @return {Promise} Returns a Promise object that has no return value.
    */
    static update(params) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(URI, (err, db) => {
                if(err) return reject(err); // Return error if exists.
                let summoner_db = db.db("test").collection("summoner-data"); // Create database "references"
                let match_db    = db.db("test").collection("match-data"); // ^^
                // First, get summoner data for the given server/username pair.
                let summoner_endpoint = RiotAPI.generateEndpointURLs(endpoints.summoner.summoner_name, {"server": params.server, "summoner-name": params["summoner-name"]});
                RiotAPI.get(summoner_endpoint).then((summoner) => { // note the result is the summoner data.
                    summoner.server = params.server; // Note we have to set this to prevent future API calls when getting data from MongoDB.
                    let league_endpoint    = RiotAPI.generateEndpointURLs(endpoints.league.lookup.summoner_id, {"server": params.server, "summoner-id": summoner.id});
                    let spectator_endpoint = RiotAPI.generateEndpointURLs(endpoints.spectator.summoner_id, {"server": params.server, "summoner-id": summoner.id});
                    let matchlist_endpoint = RiotAPI.generateEndpointURLs(endpoints.match.matchlist.account_id, {"server": params.server, "account-id": summoner.accountId, "end-index": config.query.match.endIndex});
                    let mastery_endpoint   = RiotAPI.generateEndpointURLs(endpoints.champion_mastery.list.summoner_id, {"server": params.server, "summoner-id": summoner.id});
                    // Run all API queries simultaneously.
                    async.parallel(async.reflectAll({
                        "summoner": (callback) => {
                            summoner_db.updateOne({"summoner.id": summoner.id}, {$set: {"summoner": summoner}}, {"upsert": true});
                            callback(null);
                        },
                        "league": (callback) => {
                            RiotAPI.get(league_endpoint).then((result) => {
                                summoner_db.updateOne({"summoner.id": summoner.id}, {$set: {"league": result}}, {"upsert": true});
                                callback(null);
                            }).catch((err) => callback(err));
                        },
                        "spectator": (callback) => {
                            RiotAPI.get(spectator_endpoint).then((result) => {
                                summoner_db.updateOne({"summoner.id": summoner.id}, {$set: {"spectator": result}}, {"upsert": true});
                                callback(null);
                            }).catch((err) => callback(err));
                        },
                        "matches": (callback) => {
                            RiotAPI.get(matchlist_endpoint)
                            .then((result) => {
                                summoner_db.updateOne({"summoner.id": summoner.id}, {$set: {"matches": result}}, {"upsert": true});
                                async.each(result.matches, (match, callback2) => {
                                    let match_endpoint     = RiotAPI.generateEndpointURLs(endpoints.match.match.match_id, {"server": match.platformId.toLowerCase(), "match-id": match.gameId});
                                    let timeline_endpoint  = RiotAPI.generateEndpointURLs(endpoints.match.timeline.match_id, {"server": match.platformId.toLowerCase(), "match-id": match.gameId});
                                    async.parallel([
                                        (callback3) => {
                                            RiotAPI.get(match_endpoint)
                                            .then((match_data) => {
                                                match_db.updateOne({"gameId": match.gameId}, {$set: match_data}, {"upsert": true});
                                                callback3(null);
                                            }, (err) => callback3(err));
                                        },
                                        (callback3) => {
                                            RiotAPI.get(timeline_endpoint)
                                            .then((timeline_data) => {
                                                match_db.updateOne({"gameId": match.gameId}, {$set: {"timeline": timeline_data}}, {"upsert": true});
                                                callback3(null);
                                            }, (err) => callback3(err));
                                        }
                                    ], (err) => {
                                        if(err) return callback2(err);
                                        callback2(null);
                                    });
                                }, (err) => {
                                    if(err) return callback(err);
                                    callback(null);
                                });
                            }, (err) => callback(err));
                        },
                        "mastery": (callback) => {
                            RiotAPI.get(mastery_endpoint).then((result) => {
                                summoner_db.updateOne({"summoner.id": summoner.id}, {$set: {"mastery": result}}, {"upsert": true})
                                callback(null);
                            }).catch((err) => callback(err));
                        },
                        "custom": (callback) => {
                            summoner_db.updateOne({"summoner.id": summoner.id}, 
                            {
                                $set: {
                                    "custom.unique_name": summoner.name.replace(/\s/g, "").toLowerCase(),
                                }
                            }, 
                            {"upsert": true});
                            callback(null);
                        }
                    }), (err) => {
                        if(err) {
                            console.log(err);
                            reject(err);
                        }
                        else resolve();
                    });
                }).then(() => {
                   resolve();  
                }).catch((err) => { // If summoner data does not return properly.
                    reject(err);
                });
            });
        });
    }

    /** 
     * Fetch the relevant data from the MongoDB database and return specific information
     * 
     * @static
     * @param {Object} filter MongoDB filter dictionary.
     * @param {Object} select Data to select from using keys using a separate dictionary.
     * 
     * @return {Promise} Returns a Promise object with a return value of the resulting data.
    */
    static filterData(filter={}, select={}) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(URI, async (err, db) => {
                if(err) {
                    reject(err);
                    return;
                }
                
                let match_db = db.db("test").collection("match-data"); // Create database "references"

                let select_dict = {"_id": 0};
                Object.values(select).forEach((sel) => { // Convert select to a dictionary to get certain values from db.collection.find()
                    select_dict[sel] = 1;
                });

                let selected_data = await match_db.find(filter).project(select_dict).toArray(); // Fetch relevant data from MongoDB

                let select_split = Object.assign({}, select); // Create a modified version of select with period-split array for dot notation
                Object.keys(select_split).map((key, index) => {
                    select_split[key] = select_split[key].split(".");
                });

                let flat_data = []; // Create a new array of "flattened" data

                if(Object.keys(select).length >= 1) {
                    selected_data.forEach((data) => { // For each match in selected_data...
                        let fd_push = {}; // Create a new temporary dictionary
                        Object.keys(select_split).forEach((key) => { // For each select-key in select_split...
                            fd_push[key] = data; // Copy the data from selected_data at the new key (key in select)
                            select_split[key].forEach((spl) => { // Begin to flatten hierarchy in dictionary for selected_data; for each key in select_split...
                                if(Array.isArray(fd_push[key])) fd_push[key] = fd_push[key].reduce((result, element) => { // If an array, reduce every element and reduce one layer of nested dict
                                    if(element == null) result.push(null); // Ignore null values
                                    else result.push(element[spl]);
                                    return result; // Use an accumulator array instead of directly using Array.map();
                                }, []);
                                else fd_push[key] = fd_push[key][spl]; // Otherwise, just remove one key-layer in nested dictionary
                            });
                        });
                        flat_data.push(fd_push); // Add the flattened version to flat_data
                    });
                } else {
                    flat_data = selected_data;
                }

                resolve({data: selected_data, refs: select_split, comb: flat_data}); // Return results
            });
        });
    }
}

module.exports = Rubidium;

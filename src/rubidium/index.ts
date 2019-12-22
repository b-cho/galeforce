import {default as RiotAPIModule} from "../riot-api";
import getConfig from "./configs/default";
import ConfigInterface from "./interfaces/config";
import DatabaseInternal from "./databases/database";
import MongoDBInternal from "./databases/mongo-db";
import FetchMatchByID from "./actions/fetch-matches";
import FetchSummonerByName from "./actions/fetch-summoner";
import FilterMatches from "./actions/filter-matches";
import FilterSummoners from "./actions/filter-summoner";
import SetMatch from "./actions/set-matches";
import SetSummoner from "./actions/set-summoner";
import MatchInterface from "./interfaces/match";
import SummonerInterface from "./interfaces/summoner";

interface RubidiumSummonerInterface {
    fetch: {
        byName: (server: string, username: string, endIndex?: number) => FetchSummonerByName;
    },
    filter: (query: object) => FilterSummoners;
    set: (summoner: SummonerInterface) => SetSummoner;
}

interface RubidiumMatchInterface {
    fetch: {
        byId: (server: string, matchId: number) => FetchMatchByID;
    },
    filter: (query: object) => FilterMatches;
    set: (match: MatchInterface) => SetMatch;
}

class Rubidium {
    private config: ConfigInterface;
    private RiotAPI: RiotAPIModule;
    private database: DatabaseInternal;

    constructor(options: ConfigInterface | string) {
        if(typeof options == "string") this.config = getConfig(options);
        else this.config = options;

        this.RiotAPI = new RiotAPIModule(this.config["riot-api"].key);

        if(this.config.database.type == "mongodb") {
            this.database = new MongoDBInternal(this.config.database.uri);
        } else {
            throw Error("Invalid database type selected in config.");
        }
    }

    public async init(): Promise<void> {
        await this.RiotAPI.init();
    }

    public summoner: RubidiumSummonerInterface = {
        fetch: {
            byName: (server: string, username: string, endIndex?: number) => { return new FetchSummonerByName(this.RiotAPI, this.database, server, username, endIndex) }
        },
        filter: (query: object) => { return new FilterSummoners(this.RiotAPI, this.database, query) },
        set: (summoner: SummonerInterface) => { return new SetSummoner(this.RiotAPI, this.database, summoner) }
    }

    public match: RubidiumMatchInterface = {
        fetch: {
            byId: (server: string, matchId: number) => { return new FetchMatchByID(this.RiotAPI, this.database, server, matchId) }
        },
        filter: (query: object) => { return new FilterMatches(this.RiotAPI, this.database, query) },
        set: (match: MatchInterface) => { return new SetMatch(this.RiotAPI, this.database, match) }
    }
}

export { getConfig };
export default Rubidium;
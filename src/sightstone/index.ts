import RiotAPIModule, { ENDPOINTS, REGIONS } from '../riot-api';
import getConfig from './configs/default';
import ConfigInterface from './interfaces/config';
import DatabaseInternal from './databases/database';
import MongoDBInternal from './databases/mongo-db';
import MatchInterface from './interfaces/match';
import SummonerInterface from './interfaces/summoner';
import FetchMatchByID from './actions/fetch/fetch-match';
import FetchSummonerByName from './actions/fetch/fetch-summoner';
import FilterMatches from './actions/filter/filter-match';
import FilterSummoners from './actions/filter/filter-summoner';
import SetMatch from './actions/set/set-match';
import SetSummoner from './actions/set/set-summoner';
import UpsertMatch from './actions/upsert/upsert-match';
import UpsertSummoner from './actions/upsert/upsert-summoner';
import GetMasteryLeaderboard from './actions/analysis/mastery/get-leaderboard';
import VerifyThirdPartyCode from './actions/verify/verify';
import ChampionToId from './actions/internal/champion-id';
import IdToChampion from './actions/internal/id-champion';
import Cache from './caches/cache';
import RedisCache from './caches/redis';
import SubmoduleMapInterface from './interfaces/submodule-map';
import NullCache from './caches/null';
import GetRankedLeaderboard from './actions/analysis/ranked/get-leaderboard';

interface SightstoneSummonerInterface {
    fetch: {
        byName: (server: string, username: string, endIndex?: number) => FetchSummonerByName;
    };
    filter: (query: object, projection?: object | string[]) => FilterSummoners;
    set: (summoner: SummonerInterface) => SetSummoner;
    upsert: (summoner: SummonerInterface) => UpsertSummoner;
}

interface SightstoneMatchInterface {
    fetch: {
        byMatchId: (server: string, matchId: number) => FetchMatchByID;
    };
    filter: (query: object, projection?: object | string[]) => FilterMatches;
    set: (match: MatchInterface) => SetMatch;
    upsert: (match: MatchInterface) => UpsertMatch;
}

interface SightstoneThirdPartyInterface {
    verify: {
        bySummonerId: (server: string, summonerId: string, verify: string) => VerifyThirdPartyCode;
    };
}

interface SightstoneAnalysisInterface {
    mastery: {
        getLeaderboard: (id: number[]) => GetMasteryLeaderboard;
    };
    ranked: {
        getLeaderboard: (queueTypes: string[]) => GetRankedLeaderboard;
    }
}

interface SightstoneInternalInterface {
    championToId: (champion: string) => ChampionToId;
    idToChampion: (id: number) => IdToChampion;
    json: {
        champion: () => object;
        
    };
}

class Sightstone {
    private config: ConfigInterface;

    private SubmoduleMap: SubmoduleMapInterface;

    constructor(options: ConfigInterface | string) {
        if (typeof options === 'string') this.config = getConfig(options);
        else this.config = options;

        let database: DatabaseInternal;
        let cache: Cache;

        const RiotAPI = new RiotAPIModule(this.config['riot-api'].key, this.config['riot-api'].ddversion);

        if (this.config.database.type === 'mongodb') {
            database = new MongoDBInternal(this.config.database.uri);
        } else {
            throw new Error('Invalid database type specified in config.');
        }

        if (this.config.cache.type === 'redis') {
            cache = new RedisCache(this.config.cache.uri, this.config['rate-limit']);
        } else if (this.config.cache.type === 'null') {
            cache = new NullCache();
        } else {
            throw new Error('Invalid cache type specified in config.');
        }

        this.SubmoduleMap = { RiotAPI, database, cache };
    }

    public async init(): Promise<void> {
        await this.SubmoduleMap.RiotAPI.init();
    }

    public summoner: SightstoneSummonerInterface = {
        fetch: {
            byName: (server: string, username: string, endIndex?: number): FetchSummonerByName => new FetchSummonerByName(this.SubmoduleMap, server, username, endIndex),
        },
        filter: (query: object, projection?: object | string[]): FilterSummoners => new FilterSummoners(this.SubmoduleMap, query, projection),
        set: (summoner: SummonerInterface): SetSummoner => new SetSummoner(this.SubmoduleMap, summoner),
        upsert: (summoner: SummonerInterface): UpsertSummoner => new UpsertSummoner(this.SubmoduleMap, summoner),
    }

    public match: SightstoneMatchInterface = {
        fetch: {
            byMatchId: (server: string, matchId: number): FetchMatchByID => new FetchMatchByID(this.SubmoduleMap, server, matchId),
        },
        filter: (query: object, projection?: object | string[]): FilterMatches => new FilterMatches(this.SubmoduleMap, query, projection),
        set: (match: MatchInterface): SetMatch => new SetMatch(this.SubmoduleMap, match),
        upsert: (match: MatchInterface): UpsertMatch => new UpsertMatch(this.SubmoduleMap, match),
    }

    public thirdParty: SightstoneThirdPartyInterface = {
        verify: {
            bySummonerId: (server: string, summonerId: string, verify: string): VerifyThirdPartyCode => new VerifyThirdPartyCode(this.SubmoduleMap, server, summonerId, verify),
        },
    }

    public analysis: SightstoneAnalysisInterface = {
        mastery: {
            getLeaderboard: (id: number[]): GetMasteryLeaderboard => new GetMasteryLeaderboard(this.SubmoduleMap, id),
        },
        ranked: {
            getLeaderboard: (queueTypes: string[]): GetRankedLeaderboard => new GetRankedLeaderboard(this.SubmoduleMap, queueTypes),
        }
    }

    public internal: SightstoneInternalInterface = {
        idToChampion: (id: number): IdToChampion => new IdToChampion(this.SubmoduleMap, id),
        championToId: (champion: string): ChampionToId => new ChampionToId(this.SubmoduleMap, champion),
        json: {
            champion: (): object => this.SubmoduleMap.RiotAPI.internal.championJSON(), // simply return the JSON (if loaded)
        },
    }
}

export { getConfig, ENDPOINTS, REGIONS };
export default Sightstone;

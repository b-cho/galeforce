import RiotAPIModule, { Region } from '../riot-api';
import getConfig, { validate } from './configs/default';
import { ConfigInterface } from './interfaces/config';
import FetchMatchByID from './actions/match/match-by-match-id';
import FetchSummonerByName from './actions/summoner/by-name';
import FetchThirdPartyCodeBySummonerId from './actions/platform/third-party-code';
import Cache from './caches/cache';
import RedisCache from './caches/redis';
import SubmoduleMapInterface from './interfaces/submodule-map';
import NullCache from './caches/null';
import FetchTimelineByMatchID from './actions/match/timeline-by-match-id';
import FetchMatchlistByAccountID from './actions/match/matchlist-by-account-id';
import FetchMasteryBySummonerID from './actions/mastery/by-summoner-id';
import FetchLeagueEntriesBySummonerID from './actions/league/entries-by-summoner-id';

interface SightstoneSummonerInterface {
    name: (server: Region, name: string) => FetchSummonerByName;
}

interface SightstoneMasteryInterface {
    summonerId: (server: Region, summonerId: string) => FetchMasteryBySummonerID;
}

interface SightstoneLeagueInterface {
    entries: {
        summonerId: (server: Region, summonerId: string) => FetchLeagueEntriesBySummonerID;
    };
}

interface SightstoneMatchInterface {
    matchId: (server: Region, matchId: number) => FetchMatchByID;
    timeline: {
        matchId: (server: Region, matchId: number) => FetchTimelineByMatchID;
    };
    matchlist: {
        accountId: (server: Region, accountId: string) => FetchMatchlistByAccountID;
    };
}

interface SightstonePlatformInterface {
    thirdPartyCode: {
        summonerId: (server: Region, summonerId: string) => FetchThirdPartyCodeBySummonerId;
    }
}

export default class Sightstone {
    readonly config: ConfigInterface;

    private SubmoduleMap: SubmoduleMapInterface;

    constructor(options: ConfigInterface | string) {
        if (typeof options === 'string') this.config = getConfig(options);
        else this.config = options;
        if (!validate(this.config)) throw new Error('Invalid config provided (config failed JSON schema validation).');

        let cache: Cache;

        const RiotAPI = new RiotAPIModule(this.config['riot-api'].key);

        if (this.config.cache) {
            if(this.config.cache.type === 'redis' && typeof(this.config.cache.uri) !== 'undefined') {
                cache = new RedisCache(this.config.cache.uri, this.config['rate-limit']);
            } else if (this.config.cache.type === 'null') {
                cache = new NullCache();
            } else {
                throw new Error('Invalid cache type specified in config.');
            }
        } else {
            cache = new NullCache();
        }

        this.SubmoduleMap = { RiotAPI, cache };
    }

    public summoner: SightstoneSummonerInterface = {
        name: (server: Region, name: string): FetchSummonerByName => new FetchSummonerByName(this.SubmoduleMap, server, name),
    }

    public mastery: SightstoneMasteryInterface = {
        summonerId: (server: Region, summonerId: string): FetchMasteryBySummonerID => new FetchMasteryBySummonerID(this.SubmoduleMap, server, summonerId),
    }

    public league: SightstoneLeagueInterface = {
        entries: {
            summonerId: (server: Region, summonerId: string): FetchLeagueEntriesBySummonerID => new FetchLeagueEntriesBySummonerID(this.SubmoduleMap, server, summonerId),
        },
    }

    public match: SightstoneMatchInterface = {
        matchId: (server: Region, matchId: number): FetchMatchByID => new FetchMatchByID(this.SubmoduleMap, server, matchId),
        timeline: {
            matchId: (server: Region, matchId: number): FetchTimelineByMatchID => new FetchTimelineByMatchID(this.SubmoduleMap, server, matchId),
        },
        matchlist: {
            accountId: (server: Region, accountId: string): FetchMatchlistByAccountID => new FetchMatchlistByAccountID(this.SubmoduleMap, server, accountId),
        },
    }

    public platform: SightstonePlatformInterface = {
        thirdPartyCode: {
            summonerId: (server: Region, summonerId: string): FetchThirdPartyCodeBySummonerId => new FetchThirdPartyCodeBySummonerId(this.SubmoduleMap, server, summonerId),
        }
    }

    public regions: typeof Region = Region;
}

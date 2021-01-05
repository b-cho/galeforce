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
    name: (region: Region, summonerName: string) => FetchSummonerByName;
}

interface SightstoneMasteryInterface {
    summonerId: (region: Region, summonerId: string) => FetchMasteryBySummonerID;
}

interface SightstoneLeagueInterface {
    entries: {
        summonerId: (region: Region, summonerId: string) => FetchLeagueEntriesBySummonerID;
    };
}

interface SightstoneMatchInterface {
    matchId: (region: Region, matchId: number) => FetchMatchByID;
    timeline: {
        matchId: (region: Region, matchId: number) => FetchTimelineByMatchID;
    };
    matchlist: {
        accountId: (region: Region, accountId: string) => FetchMatchlistByAccountID;
    };
}

interface SightstonePlatformInterface {
    thirdPartyCode: {
        summonerId: (region: Region, summonerId: string) => FetchThirdPartyCodeBySummonerId;
    };
}

export default class Sightstone {
    readonly config: ConfigInterface;

    private SubmoduleMap: SubmoduleMapInterface;

    constructor(options: ConfigInterface | string) {
        this.config = typeof options === 'string' ? getConfig(options) : options;

        if (!validate(this.config)) throw new Error('Invalid config provided (config failed JSON schema validation).');

        let cache: Cache;

        const RiotAPI = new RiotAPIModule(this.config['riot-api'].key);

        if (this.config.cache) {
            if (this.config.cache.type === 'redis' && typeof this.config.cache.uri !== 'undefined') {
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
        name: (region: Region, summonerName: string): FetchSummonerByName => (
            new FetchSummonerByName(this.SubmoduleMap, region, summonerName)
        ),
    }

    public mastery: SightstoneMasteryInterface = {
        summonerId: (region: Region, summonerId: string): FetchMasteryBySummonerID => (
            new FetchMasteryBySummonerID(this.SubmoduleMap, region, summonerId)
        ),
    }

    public league: SightstoneLeagueInterface = {
        entries: {
            summonerId: (region: Region, summonerId: string): FetchLeagueEntriesBySummonerID => (
                new FetchLeagueEntriesBySummonerID(this.SubmoduleMap, region, summonerId)
            ),
        },
    }

    public match: SightstoneMatchInterface = {
        matchId: (region: Region, matchId: number): FetchMatchByID => (
            new FetchMatchByID(this.SubmoduleMap, region, matchId)
        ),
        timeline: {
            matchId: (region: Region, matchId: number): FetchTimelineByMatchID => (
                new FetchTimelineByMatchID(this.SubmoduleMap, region, matchId)
            ),
        },
        matchlist: {
            accountId: (region: Region, accountId: string): FetchMatchlistByAccountID => (
                new FetchMatchlistByAccountID(this.SubmoduleMap, region, accountId)
            ),
        },
    }

    public platform: SightstonePlatformInterface = {
        thirdPartyCode: {
            summonerId: (region: Region, summonerId: string): FetchThirdPartyCodeBySummonerId => (
                new FetchThirdPartyCodeBySummonerId(this.SubmoduleMap, region, summonerId)
            ),
        },
    }

    public regions: typeof Region = Region;
}

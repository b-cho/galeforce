import RiotAPIModule, { Region } from '../riot-api';
import getConfig, { validate } from './configs/default';
import { ConfigInterface } from './interfaces/config';
import FetchMatchByID from './actions/match/match-by-match-id';
import FetchSummoner from './actions/summoner';
import FetchThirdPartyCodeBySummonerId from './actions/platform/third-party-code';
import Cache from './caches/cache';
import RedisCache from './caches/redis';
import SubmoduleMapInterface from './interfaces/submodule-map';
import NullCache from './caches/null';
import FetchTimelineByMatchID from './actions/match/timeline-by-match-id';
import FetchMatchlistByAccountID from './actions/match/matchlist-by-account-id';
import FetchMasteryBySummonerID from './actions/mastery/by-summoner-id';
import FetchLeagueEntriesBySummonerID from './actions/league/entries-by-summoner-id';

interface SightstoneMasteryInterface {
    summoner: () => FetchMasteryBySummonerID;
}

interface SightstoneLeagueInterface {
    entries: () => FetchLeagueEntriesBySummonerID;
}

interface SightstoneMatchInterface {
    match: () => FetchMatchByID;
    timeline: () => FetchTimelineByMatchID;
    matchlist: () => FetchMatchlistByAccountID;
}

interface SightstonePlatformInterface {
    thirdPartyCode: () => FetchThirdPartyCodeBySummonerId;
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

    public summoner = () => new FetchSummoner(this.SubmoduleMap);

    public mastery: SightstoneMasteryInterface = {
        summoner: () => new FetchMasteryBySummonerID(this.SubmoduleMap),
    }

    public league: SightstoneLeagueInterface = {
        entries: () => new FetchLeagueEntriesBySummonerID(this.SubmoduleMap),
    }

    public match: SightstoneMatchInterface = {
        match: () => new FetchMatchByID(this.SubmoduleMap),
        timeline: () => new FetchTimelineByMatchID(this.SubmoduleMap),
        matchlist: () => new FetchMatchlistByAccountID(this.SubmoduleMap),
    }

    public platform: SightstonePlatformInterface = {
        thirdPartyCode: () => new FetchThirdPartyCodeBySummonerId(this.SubmoduleMap),
    }

    public regions: typeof Region = Region;
}

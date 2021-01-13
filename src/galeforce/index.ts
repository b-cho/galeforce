import RiotAPIModule, { Region, Queue, Tier, Division } from '../riot-api';
import getConfig, { validate } from './configs/default';
import { ConfigInterface } from './interfaces/config';
import FetchMatchByID from './actions/match/match-by-match-id';
import FetchSummoner from './actions/summoner';
import FetchThirdPartyCodeBySummonerId from './actions/third-party-code';
import Cache from './caches/cache';
import RedisCache from './caches/redis';
import SubmoduleMapInterface from './interfaces/submodule-map';
import NullCache from './caches/null';
import FetchTimelineByMatchID from './actions/match/timeline-by-match-id';
import FetchMatchlistByAccountID from './actions/match/matchlist-by-account-id';
import FetchMasteryBySummonerID from './actions/champion-mastery/by-summoner-id';
import FetchLeagueEntries from './actions/league/entries';
import FetchLeagueList from './actions/league/leagues';
import FetchLeaguePlatformData from './actions/lol-status';
import FetchChampionRotations from './actions/champion';
import FetchClashPlayersBySummonerID from './actions/clash/players';
import FetchClashTeamByTeamID from './actions/clash/teams';
import FetchClashTournament from './actions/clash/tournaments';
import FetchMatchesByTournamentCode from './actions/match/tournament-matches';
import FetchCurrentGameInfoBySummonerID from './actions/spectator/active-games';
import FetchFeaturedGames from './actions/spectator/featured-games';
import FetchMasteryScoreBySummonerID from './actions/champion-mastery/score';

interface GaleforceChampionMasteryInterface {
    summoner: () => FetchMasteryBySummonerID;
    score: () => FetchMasteryScoreBySummonerID;
}

interface GaleforceLeagueInterface {
    entries: () => FetchLeagueEntries;
    league: () => FetchLeagueList;
}

interface GaleforceMatchInterface {
    match: () => FetchMatchByID;
    timeline: () => FetchTimelineByMatchID;
    matchlist: () => FetchMatchlistByAccountID;
    tournament: () => FetchMatchesByTournamentCode;
}

interface GaleforcePlatformInterface {
    thirdPartyCode: () => FetchThirdPartyCodeBySummonerId;
    championRotations: () => FetchChampionRotations;
}

interface GaleforceStatusInterface {
    platformData: () => FetchLeaguePlatformData;
}

interface GaleforceClashInterface {
    players: () => FetchClashPlayersBySummonerID;
    team: () => FetchClashTeamByTeamID;
    tournament: () => FetchClashTournament;
}

interface GaleforceSpectatorInterface {
    active: () => FetchCurrentGameInfoBySummonerID;
    featured: () => FetchFeaturedGames;
}

export default class Galeforce {
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

    public mastery: GaleforceChampionMasteryInterface = {
        summoner: () => new FetchMasteryBySummonerID(this.SubmoduleMap),
        score: () => new FetchMasteryScoreBySummonerID(this.SubmoduleMap),
    }

    public league: GaleforceLeagueInterface = {
        entries: () => new FetchLeagueEntries(this.SubmoduleMap),
        league: () => new FetchLeagueList(this.SubmoduleMap),
    }

    public match: GaleforceMatchInterface = {
        match: () => new FetchMatchByID(this.SubmoduleMap),
        timeline: () => new FetchTimelineByMatchID(this.SubmoduleMap),
        matchlist: () => new FetchMatchlistByAccountID(this.SubmoduleMap),
        tournament: () => new FetchMatchesByTournamentCode(this.SubmoduleMap),
    }

    public platform: GaleforcePlatformInterface = {
        thirdPartyCode: () => new FetchThirdPartyCodeBySummonerId(this.SubmoduleMap),
        championRotations: () => new FetchChampionRotations(this.SubmoduleMap),
    }

    public status: GaleforceStatusInterface = {
        platformData: () => new FetchLeaguePlatformData(this.SubmoduleMap),
    }

    public clash: GaleforceClashInterface = {
        players: () => new FetchClashPlayersBySummonerID(this.SubmoduleMap),
        team: () => new FetchClashTeamByTeamID(this.SubmoduleMap),
        tournament: () => new FetchClashTournament(this.SubmoduleMap),
    }

    public spectator: GaleforceSpectatorInterface = {
        active: () => new FetchCurrentGameInfoBySummonerID(this.SubmoduleMap),
        featured: () => new FetchFeaturedGames(this.SubmoduleMap),
    }

    public regions: typeof Region = Region;

    public queues: typeof Queue = Queue;

    public tiers: typeof Tier = Tier;

    public divisions: typeof Division = Division;
}

import RiotAPIModule, { Region, Queue, Tier, Division } from '../riot-api';
import getConfig, { validate } from './configs/default';
import { ConfigInterface } from './interfaces/config';
import GetMatchByID from './actions/match/match-by-match-id';
import GetSummoner from './actions/summoner';
import GetThirdPartyCode from './actions/third-party-code';
import Cache from './caches/cache';
import RedisCache from './caches/redis';
import SubmoduleMapInterface from './interfaces/submodule-map';
import NullCache from './caches/null';
import GetTimelineByMatchID from './actions/match/timeline-by-match-id';
import GetMatchlistByAccountID from './actions/match/matchlist-by-account-id';
import GetMasteryBySummoner from './actions/champion-mastery/by-summoner';
import GetLeagueEntries from './actions/league/entries';
import GetLeagueList from './actions/league/leagues';
import GetLeaguePlatformData from './actions/lol-status';
import GetChampionRotations from './actions/champion';
import GetClashPlayers from './actions/clash/players';
import GetClashTeam from './actions/clash/teams';
import GetClashTournament from './actions/clash/tournaments';
import GetMatchesByTournamentCode from './actions/match/tournament-matches';
import GetCurrentGameInfo from './actions/spectator/active-games';
import GetFeaturedGames from './actions/spectator/featured-games';
import GetMasteryScore from './actions/champion-mastery/score';

interface GaleforceChampionMasteryInterface {
    summoner: () => GetMasteryBySummoner;
    score: () => GetMasteryScore;
}

interface GaleforceLeagueInterface {
    entries: () => GetLeagueEntries;
    league: () => GetLeagueList;
}

interface GaleforceMatchInterface {
    match: () => GetMatchByID;
    timeline: () => GetTimelineByMatchID;
    matchlist: () => GetMatchlistByAccountID;
    tournament: () => GetMatchesByTournamentCode;
}

interface GaleforcePlatformInterface {
    thirdPartyCode: () => GetThirdPartyCode;
    championRotations: () => GetChampionRotations;
}

interface GaleforceStatusInterface {
    platformData: () => GetLeaguePlatformData;
}

interface GaleforceClashInterface {
    players: () => GetClashPlayers;
    team: () => GetClashTeam;
    tournament: () => GetClashTournament;
}

interface GaleforceSpectatorInterface {
    active: () => GetCurrentGameInfo;
    featured: () => GetFeaturedGames;
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

    public summoner = () => new GetSummoner(this.SubmoduleMap);

    public mastery: GaleforceChampionMasteryInterface = {
        summoner: () => new GetMasteryBySummoner(this.SubmoduleMap),
        score: () => new GetMasteryScore(this.SubmoduleMap),
    }

    public league: GaleforceLeagueInterface = {
        entries: () => new GetLeagueEntries(this.SubmoduleMap),
        league: () => new GetLeagueList(this.SubmoduleMap),
    }

    public match: GaleforceMatchInterface = {
        match: () => new GetMatchByID(this.SubmoduleMap),
        timeline: () => new GetTimelineByMatchID(this.SubmoduleMap),
        matchlist: () => new GetMatchlistByAccountID(this.SubmoduleMap),
        tournament: () => new GetMatchesByTournamentCode(this.SubmoduleMap),
    }

    public platform: GaleforcePlatformInterface = {
        thirdPartyCode: () => new GetThirdPartyCode(this.SubmoduleMap),
        championRotations: () => new GetChampionRotations(this.SubmoduleMap),
    }

    public status: GaleforceStatusInterface = {
        platformData: () => new GetLeaguePlatformData(this.SubmoduleMap),
    }

    public clash: GaleforceClashInterface = {
        players: () => new GetClashPlayers(this.SubmoduleMap),
        team: () => new GetClashTeam(this.SubmoduleMap),
        tournament: () => new GetClashTournament(this.SubmoduleMap),
    }

    public spectator: GaleforceSpectatorInterface = {
        active: () => new GetCurrentGameInfo(this.SubmoduleMap),
        featured: () => new GetFeaturedGames(this.SubmoduleMap),
    }

    public regions: typeof Region = Region;

    public queues: typeof Queue = Queue;

    public tiers: typeof Tier = Tier;

    public divisions: typeof Division = Division;
}

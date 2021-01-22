import RiotAPIModule, { Region, Queue, Tier, Division, Game } from '../riot-api';
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
import GetAccount from './actions/account/account';
import GetActiveShard from './actions/account/active-shard';
import PostTournamentCodes from './actions/tournament/create-codes';
import GetTournamentCodes from './actions/tournament/get-tournament-by-code';
import PutTournamentCodes from './actions/tournament/update-tournament';
import PostProviders from './actions/tournament/providers';
import PostTournaments from './actions/tournament/tournaments';
import GetLobbyEvents from './actions/tournament/lobby-events';


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

interface GaleforceAccountInterface {
    account: () => GetAccount;
    activeShard: () => GetActiveShard;
}

interface GaleforceTournamentInterface {
    code: {
        create: () => PostTournamentCodes,
        get: () => GetTournamentCodes,
        update: () => PutTournamentCodes,
    },
    event: () => GetLobbyEvents,
    provider: () => PostProviders,
    tournament: () => PostTournaments,
}

interface GaleforceInterface {
    lol: {
        summoner: () => GetSummoner;
        mastery: GaleforceChampionMasteryInterface;
        league: GaleforceLeagueInterface;
        match: GaleforceMatchInterface;
        platform: GaleforcePlatformInterface;
        status: GaleforceStatusInterface;
        clash: GaleforceClashInterface;
        spectator: GaleforceSpectatorInterface;
        tournament: GaleforceTournamentInterface;
    };
    riot: {
        account: GaleforceAccountInterface;
    }
    regions: typeof Region;
    queues: typeof Queue;
    tiers: typeof Tier;
    divisions: typeof Division;
    games: typeof Game;
}

export default class Galeforce implements GaleforceInterface {
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

    public lol = {
        summoner: () => new GetSummoner(this.SubmoduleMap),
        mastery: {
            summoner: () => new GetMasteryBySummoner(this.SubmoduleMap),
            score: () => new GetMasteryScore(this.SubmoduleMap),
        },
        league: {
            entries: () => new GetLeagueEntries(this.SubmoduleMap),
            league: () => new GetLeagueList(this.SubmoduleMap),
        },
        match: {
            match: () => new GetMatchByID(this.SubmoduleMap),
            timeline: () => new GetTimelineByMatchID(this.SubmoduleMap),
            matchlist: () => new GetMatchlistByAccountID(this.SubmoduleMap),
            tournament: () => new GetMatchesByTournamentCode(this.SubmoduleMap),
        },
        platform: {
            thirdPartyCode: () => new GetThirdPartyCode(this.SubmoduleMap),
            championRotations: () => new GetChampionRotations(this.SubmoduleMap),
        },
        status: {
            platformData: () => new GetLeaguePlatformData(this.SubmoduleMap),
        },
        clash: {
            players: () => new GetClashPlayers(this.SubmoduleMap),
            team: () => new GetClashTeam(this.SubmoduleMap),
            tournament: () => new GetClashTournament(this.SubmoduleMap),
        },
        spectator: {
            active: () => new GetCurrentGameInfo(this.SubmoduleMap),
            featured: () => new GetFeaturedGames(this.SubmoduleMap),
        },
        tournament: {
            code: {
                create: () => new PostTournamentCodes(this.SubmoduleMap),
                get: () => new GetTournamentCodes(this.SubmoduleMap),
                update: () => new PutTournamentCodes(this.SubmoduleMap),
            },
            event: () => new GetLobbyEvents(this.SubmoduleMap),
            provider: () => new PostProviders(this.SubmoduleMap),
            tournament: () => new PostTournaments(this.SubmoduleMap),
        }
    }

    public riot = {
        account: {
            account: () => new GetAccount(this.SubmoduleMap),
            activeShard: () => new GetActiveShard(this.SubmoduleMap),
        }
    }

    public regions: typeof Region = Region;

    public queues: typeof Queue = Queue;

    public tiers: typeof Tier = Tier;

    public divisions: typeof Division = Division;

    public games: typeof Game = Game;
}

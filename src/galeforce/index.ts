import RiotAPIModule, {
    Tier, Division, Game, ValorantRegion, LeagueRegion, RiotRegion, LeagueQueue, ValorantQueue,
} from '../riot-api';
import getConfig, { validate } from './configs/default';
import { ConfigInterface } from './interfaces/config';
import GetMatch from './actions/match/match';
import GetSummoner from './actions/summoner';
import GetThirdPartyCode from './actions/third-party-code';
import Cache from './caches/cache';
import RedisCache from './caches/redis';
import SubmoduleMapInterface from './interfaces/submodule-map';
import NullCache from './caches/null';
import GetTimeline from './actions/match/timeline';
import GetMatchlist from './actions/match/matchlist';
import GetMasteryBySummoner from './actions/champion-mastery/by-summoner';
import GetLeagueEntries from './actions/league/entries';
import GetLeagueList from './actions/league/leagues';
import GetLeaguePlatformData from './actions/lol-status';
import GetChampionRotations from './actions/champion';
import GetClashPlayers from './actions/clash/players';
import GetClashTeam from './actions/clash/teams';
import GetClashTournament from './actions/clash/tournaments';
import GetTournamentMatches from './actions/match/tournament-matches';
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
import GetUpcomingClashTournaments from './actions/clash/upcoming-tournaments';
import GetLorMatch from './actions/lor-match/match';
import GetLorMatchlist from './actions/lor-match/matchlist';
import GetLorRankedLeaderboard from './actions/lor-ranked/leaderboard';
import GetLorPlatformData from './actions/lor-status';
import GetTFTLeagueEntries from './actions/tft-league/entries';
import GetTFTLeagueList from './actions/tft-league/leagues';
import GetTFTMatch from './actions/tft-match/match';
import GetTFTMatchlist from './actions/tft-match/matchlist';
import GetTFTSummoner from './actions/tft-summoner';
import GetValorantContent from './actions/val-content/contents';
import GetValorantMatch from './actions/val-match/match';
import GetValorantMatchlist from './actions/val-match/matchlist';
import GetValorantRecentMatches from './actions/val-match/recent-matches';
import GetValorantRankedLeaderboard from './actions/val-ranked/leaderboard';
import GetValorantPlatformData from './actions/val-status';

interface GaleforceChampionMasteryInterface {
    summoner: () => GetMasteryBySummoner;
    score: () => GetMasteryScore;
}

interface GaleforceLeagueInterface {
    entries: () => GetLeagueEntries;
    league: () => GetLeagueList;
}

interface GaleforceMatchInterface {
    match: () => GetMatch;
    timeline: () => GetTimeline;
    matchlist: () => GetMatchlist;
    tournament: () => GetTournamentMatches;
}

interface GaleforcePlatformInterface {
    thirdPartyCode: () => GetThirdPartyCode;
    championRotations: () => GetChampionRotations;
}

interface GaleforceClashInterface {
    players: () => GetClashPlayers;
    team: () => GetClashTeam;
    tournament: () => GetClashTournament;
    upcoming: () => GetUpcomingClashTournaments;
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
        create: () => PostTournamentCodes;
        get: () => GetTournamentCodes;
        update: () => PutTournamentCodes;
    };
    event: () => GetLobbyEvents;
    provider: () => PostProviders;
    tournament: () => PostTournaments;
}

interface GaleforceLorMatchInterface {
    match: () => GetLorMatch;
    matchlist: () => GetLorMatchlist;
}

interface GaleforceLorRankedInterface {
    leaderboard: () => GetLorRankedLeaderboard;
}

interface GaleforceTFTLeagueInterface {
    entries: () => GetTFTLeagueEntries;
    league: () => GetTFTLeagueList;
}

interface GaleforceTFTMatchInterface {
    match: () => GetTFTMatch;
    matchlist: () => GetTFTMatchlist;
}

interface GaleforceValorantMatchInterface {
    match: () => GetValorantMatch;
    matchlist: () => GetValorantMatchlist;
    recent: () => GetValorantRecentMatches;
}

interface GaleforceValorantRankedInterface {
    leaderboard: () => GetValorantRankedLeaderboard;
}

interface GaleforceInterface {
    lol: {
        summoner: () => GetSummoner;
        mastery: GaleforceChampionMasteryInterface;
        league: GaleforceLeagueInterface;
        match: GaleforceMatchInterface;
        platform: GaleforcePlatformInterface;
        status: () => GetLeaguePlatformData;
        clash: GaleforceClashInterface;
        spectator: GaleforceSpectatorInterface;
        tournament: GaleforceTournamentInterface;
    };
    riot: {
        account: GaleforceAccountInterface;
    };
    lor: {
        match: GaleforceLorMatchInterface;
        ranked: GaleforceLorRankedInterface;
        status: () => GetLorPlatformData;
    };
    tft: {
        league: GaleforceTFTLeagueInterface;
        match: GaleforceTFTMatchInterface;
        summoner: () => GetTFTSummoner;
    };
    regions: {
        lol: typeof LeagueRegion;
        val: typeof ValorantRegion;
        riot: typeof RiotRegion;
    };
    val: {
        content: () => GetValorantContent;
        match: GaleforceValorantMatchInterface;
        ranked: GaleforceValorantRankedInterface;
        status: () => GetValorantPlatformData;

    };
    queues: {
        lol: typeof LeagueQueue;
        val: typeof ValorantQueue;
    };
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
        summoner: (): GetSummoner => new GetSummoner(this.SubmoduleMap),
        mastery: {
            summoner: (): GetMasteryBySummoner => new GetMasteryBySummoner(this.SubmoduleMap),
            score: (): GetMasteryScore => new GetMasteryScore(this.SubmoduleMap),
        },
        league: {
            entries: (): GetLeagueEntries => new GetLeagueEntries(this.SubmoduleMap),
            league: (): GetLeagueList => new GetLeagueList(this.SubmoduleMap),
        },
        match: {
            match: (): GetMatch => new GetMatch(this.SubmoduleMap),
            timeline: (): GetTimeline => new GetTimeline(this.SubmoduleMap),
            matchlist: (): GetMatchlist => new GetMatchlist(this.SubmoduleMap),
            tournament: (): GetTournamentMatches => new GetTournamentMatches(this.SubmoduleMap),
        },
        platform: {
            thirdPartyCode: (): GetThirdPartyCode => new GetThirdPartyCode(this.SubmoduleMap),
            championRotations: (): GetChampionRotations => new GetChampionRotations(this.SubmoduleMap),
        },
        status: (): GetLeaguePlatformData => new GetLeaguePlatformData(this.SubmoduleMap),
        clash: {
            players: (): GetClashPlayers => new GetClashPlayers(this.SubmoduleMap),
            team: (): GetClashTeam => new GetClashTeam(this.SubmoduleMap),
            tournament: (): GetClashTournament => new GetClashTournament(this.SubmoduleMap),
            upcoming: (): GetUpcomingClashTournaments => new GetUpcomingClashTournaments(this.SubmoduleMap),
        },
        spectator: {
            active: (): GetCurrentGameInfo => new GetCurrentGameInfo(this.SubmoduleMap),
            featured: (): GetFeaturedGames => new GetFeaturedGames(this.SubmoduleMap),
        },
        tournament: {
            code: {
                create: (): PostTournamentCodes => new PostTournamentCodes(this.SubmoduleMap),
                get: (): GetTournamentCodes => new GetTournamentCodes(this.SubmoduleMap),
                update: (): PutTournamentCodes => new PutTournamentCodes(this.SubmoduleMap),
            },
            event: (): GetLobbyEvents => new GetLobbyEvents(this.SubmoduleMap),
            provider: (): PostProviders => new PostProviders(this.SubmoduleMap),
            tournament: (): PostTournaments => new PostTournaments(this.SubmoduleMap),
        },
    }

    public riot = {
        account: {
            account: (): GetAccount => new GetAccount(this.SubmoduleMap),
            activeShard: (): GetActiveShard => new GetActiveShard(this.SubmoduleMap),
        },
    }

    public lor = {
        match: {
            match: (): GetLorMatch => new GetLorMatch(this.SubmoduleMap),
            matchlist: (): GetLorMatchlist => new GetLorMatchlist(this.SubmoduleMap),
        },
        ranked: {
            leaderboard: (): GetLorRankedLeaderboard => new GetLorRankedLeaderboard(this.SubmoduleMap),
        },
        status: (): GetLorPlatformData => new GetLorPlatformData(this.SubmoduleMap),
    }

    public tft = {
        league: {
            entries: (): GetTFTLeagueEntries => new GetTFTLeagueEntries(this.SubmoduleMap),
            league: (): GetTFTLeagueList => new GetTFTLeagueList(this.SubmoduleMap),
        },
        match: {
            match: (): GetTFTMatch => new GetTFTMatch(this.SubmoduleMap),
            matchlist: (): GetTFTMatchlist => new GetTFTMatchlist(this.SubmoduleMap),
        },
        summoner: (): GetTFTSummoner => new GetTFTSummoner(this.SubmoduleMap),
    }

    public val = {
        content: (): GetValorantContent => new GetValorantContent(this.SubmoduleMap),
        match: {
            match: (): GetValorantMatch => new GetValorantMatch(this.SubmoduleMap),
            matchlist: (): GetValorantMatchlist => new GetValorantMatchlist(this.SubmoduleMap),
            recent: (): GetValorantRecentMatches => new GetValorantRecentMatches(this.SubmoduleMap),
        },
        ranked: {
            leaderboard: (): GetValorantRankedLeaderboard => new GetValorantRankedLeaderboard(this.SubmoduleMap),
        },
        status: (): GetValorantPlatformData => new GetValorantPlatformData(this.SubmoduleMap),
    }

    public regions = {
        lol: LeagueRegion,
        val: ValorantRegion,
        riot: RiotRegion,
    };

    public queues = {
        lol: LeagueQueue,
        val: ValorantQueue,
    };

    public tiers: typeof Tier = Tier;

    public divisions: typeof Division = Division;

    public games: typeof Game = Game;
}

import RiotAPIModule, {
    Region, Queue, Tier, Division, Game,
} from '../riot-api';
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
import GetUpcomingClashTournaments from './actions/clash/upcoming-tournaments';

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
    };
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
            match: (): GetMatchByID => new GetMatchByID(this.SubmoduleMap),
            timeline: (): GetTimelineByMatchID => new GetTimelineByMatchID(this.SubmoduleMap),
            matchlist: (): GetMatchlistByAccountID => new GetMatchlistByAccountID(this.SubmoduleMap),
            tournament: (): GetMatchesByTournamentCode => new GetMatchesByTournamentCode(this.SubmoduleMap),
        },
        platform: {
            thirdPartyCode: (): GetThirdPartyCode => new GetThirdPartyCode(this.SubmoduleMap),
            championRotations: (): GetChampionRotations => new GetChampionRotations(this.SubmoduleMap),
        },
        status: {
            platformData: (): GetLeaguePlatformData => new GetLeaguePlatformData(this.SubmoduleMap),
        },
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

    public regions: typeof Region = Region;

    public queues: typeof Queue = Queue;

    public tiers: typeof Tier = Tier;

    public divisions: typeof Division = Division;

    public games: typeof Game = Game;
}

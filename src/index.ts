import {
    RiotAPIModule, Tier, Division, Game,
    ValorantRegion, LeagueRegion, RiotRegion,
    LeagueQueue, ValorantQueue,
} from './riot-api';
import { getConfig, validate } from './galeforce/configs/default';
import { ConfigInterface } from './galeforce/interfaces/config';
import { GetMatch } from './galeforce/actions/match/match';
import { GetSummoner } from './galeforce/actions/summoner';
import { GetThirdPartyCode } from './galeforce/actions/third-party-code';
import { Cache } from './galeforce/caches/cache';
import { RedisCache } from './galeforce/caches/redis';
import { SubmoduleMapInterface } from './galeforce/interfaces/submodule-map';
import { NullCache } from './galeforce/caches/null';
import { GetTimeline } from './galeforce/actions/match/timeline';
import { GetMatchlist } from './galeforce/actions/match/matchlist';
import { GetMasteryList } from './galeforce/actions/champion-mastery/by-summoner';
import { GetLeagueEntries } from './galeforce/actions/league/entries';
import { GetLeagueList } from './galeforce/actions/league/leagues';
import { GetLeaguePlatformData } from './galeforce/actions/lol-status';
import { GetChampionRotations } from './galeforce/actions/champion';
import { GetClashPlayers } from './galeforce/actions/clash/players';
import { GetClashTeam } from './galeforce/actions/clash/teams';
import { GetClashTournament } from './galeforce/actions/clash/tournaments';
import { GetTournamentMatches } from './galeforce/actions/match/tournament-matches';
import { GetCurrentGameInfo } from './galeforce/actions/spectator/active-games';
import { GetFeaturedGames } from './galeforce/actions/spectator/featured-games';
import { GetMasteryScore } from './galeforce/actions/champion-mastery/score';
import { GetAccount } from './galeforce/actions/account/account';
import { GetActiveShard } from './galeforce/actions/account/active-shard';
import { PostTournamentCodes } from './galeforce/actions/tournament/create-codes';
import { GetTournamentCodes } from './galeforce/actions/tournament/get-tournament-by-code';
import { PutTournamentCodes } from './galeforce/actions/tournament/update-tournament';
import { PostProviders } from './galeforce/actions/tournament/providers';
import { PostTournaments } from './galeforce/actions/tournament/tournaments';
import { GetLobbyEvents } from './galeforce/actions/tournament/lobby-events';
import { GetUpcomingClashTournaments } from './galeforce/actions/clash/upcoming-tournaments';
import { GetLorMatch } from './galeforce/actions/lor-match/match';
import { GetLorMatchlist } from './galeforce/actions/lor-match/matchlist';
import { GetLorRankedLeaderboard } from './galeforce/actions/lor-ranked/leaderboard';
import { GetLorPlatformData } from './galeforce/actions/lor-status';
import { GetTFTLeagueEntries } from './galeforce/actions/tft-league/entries';
import { GetTFTLeagueList } from './galeforce/actions/tft-league/leagues';
import { GetTFTMatch } from './galeforce/actions/tft-match/match';
import { GetTFTMatchlist } from './galeforce/actions/tft-match/matchlist';
import { GetTFTSummoner } from './galeforce/actions/tft-summoner';
import { GetValorantContent } from './galeforce/actions/val-content/contents';
import { GetValorantMatch } from './galeforce/actions/val-match/match';
import { GetValorantMatchlist } from './galeforce/actions/val-match/matchlist';
import { GetValorantRecentMatches } from './galeforce/actions/val-match/recent-matches';
import { GetValorantRankedLeaderboard } from './galeforce/actions/val-ranked/leaderboard';
import { GetValorantPlatformData } from './galeforce/actions/val-status';
import { GetMasteryByChampion } from './galeforce/actions/champion-mastery/by-champion';

/**
 * Type definitions for the Galeforce module.
 */
interface GaleforceInterface {
    lol: {
        summoner: () => GetSummoner;
        mastery: {
            list: () => GetMasteryList;
            champion: () => GetMasteryByChampion;
            score: () => GetMasteryScore;
        };
        league: {
            entries: () => GetLeagueEntries;
            league: () => GetLeagueList;
        };
        match: {
            match: () => GetMatch;
            timeline: () => GetTimeline;
            list: () => GetMatchlist;
            tournament: () => GetTournamentMatches;
        };
        platform: {
            thirdPartyCode: () => GetThirdPartyCode;
            championRotations: () => GetChampionRotations;
        };
        status: () => GetLeaguePlatformData;
        clash: {
            players: () => GetClashPlayers;
            team: () => GetClashTeam;
            tournament: () => GetClashTournament;
            upcoming: () => GetUpcomingClashTournaments;
        };
        spectator: {
            active: () => GetCurrentGameInfo;
            featured: () => GetFeaturedGames;
        };
        tournament: {
            code: {
                create: () => PostTournamentCodes;
                get: () => GetTournamentCodes;
                update: () => PutTournamentCodes;
            };
            event: () => GetLobbyEvents;
            provider: () => PostProviders;
            tournament: () => PostTournaments;
        };
    };
    riot: {
        account: {
            account: () => GetAccount;
            activeShard: () => GetActiveShard;
        };
    };
    lor: {
        match: {
            match: () => GetLorMatch;
            list: () => GetLorMatchlist;
        };
        ranked: {
            leaderboard: () => GetLorRankedLeaderboard;
        };
        status: () => GetLorPlatformData;
    };
    tft: {
        league: {
            entries: () => GetTFTLeagueEntries;
            league: () => GetTFTLeagueList;
        };
        match: {
            match: () => GetTFTMatch;
            list: () => GetTFTMatchlist;
        };
        summoner: () => GetTFTSummoner;
    };
    regions: {
        lol: typeof LeagueRegion;
        val: typeof ValorantRegion;
        riot: typeof RiotRegion;
    };
    val: {
        content: () => GetValorantContent;
        match: {
            match: () => GetValorantMatch;
            list: () => GetValorantMatchlist;
            recent: () => GetValorantRecentMatches;
        };
        ranked: {
            leaderboard: () => GetValorantRankedLeaderboard;
        };
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
    /**
     * The configuration for the module instance. Can only be set
     * in the constructor.
     */
    readonly config: ConfigInterface;

    private SubmoduleMap: SubmoduleMapInterface;

    /**
     * Initializes the Galeforce module with a provided configuration object.
     * The configuration object is verified using a JSON schema generated from the
     * {@link ConfigInterface} interface.
     * @param options A JSON configuration object or a path to a valid YAML file.
     * @throws Will throw an Error if provided an invalid configuration file or object.
     */
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

    /**
     * Object containing actions corresponding to the the `/lol` set of endpoints.
     */
    public lol = {
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lol/summoner/v4/summoners/by-account/{encryptedAccountId}`
         * - (**GET**) `/lol/summoner/v4/summoners/by-name/{summonerName}`
         * - (**GET**) `/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}`
         * - (**GET**) `/lol/summoner/v4/summoners/{encryptedSummonerId}`
         */
        summoner: (): GetSummoner => new GetSummoner(this.SubmoduleMap),
        /**
         * Object containing actions corresponding to the `/lol/champion-mastery` set of endpoints.
         */
        mastery: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}`
             */
            list: (): GetMasteryList => new GetMasteryList(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}`
             */
            champion: (): GetMasteryByChampion => new GetMasteryByChampion(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}`
             */
            score: (): GetMasteryScore => new GetMasteryScore(this.SubmoduleMap),
        },
        /**
         * Object containing actions corresponding to the `/lol/league` set of endpoints.
         */
        league: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/league/v4/entries/by-summoner/{encryptedSummonerId}`
             * - (**GET**) `/lol/league/v4/entries/{queue}/{tier}/{division}`
             */
            entries: (): GetLeagueEntries => new GetLeagueEntries(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/league/v4/challengerleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/grandmasterleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/masterleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/entries/by-summoner/{encryptedSummonerId}`
             */
            league: (): GetLeagueList => new GetLeagueList(this.SubmoduleMap),
        },
        /**
         * Object containing actions corresponding to the `/lol/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v4/matches/{matchId}`
             * - (**GET**) `/lol/match/v4/matches/by-tournament-code/{tournamentCode}/ids`
             */
            match: (): GetMatch => new GetMatch(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v4/timelines/by-match/{matchId}`
             */
            timeline: (): GetTimeline => new GetTimeline(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v4/matchlists/by-account/{encryptedAccountId}`
             */
            list: (): GetMatchlist => new GetMatchlist(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v4/matches/{matchId}/by-tournament-code/{tournamentCode}`
             */
            tournament: (): GetTournamentMatches => new GetTournamentMatches(this.SubmoduleMap),
        },
        /**
         * Object containing actions corresponding to the `/lol/platform` set of endpoints.
         * This includes the **THIRD-PARTY-CODE-V4** and **CHAMPION-V3** API sections.
         */
        platform: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/platform/v4/third-party-code/by-summoner/{encryptedSummonerId}`
             */
            thirdPartyCode: (): GetThirdPartyCode => new GetThirdPartyCode(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**)  `/lol/platform/v3/champion-rotations`
             */
            championRotations: (): GetChampionRotations => new GetChampionRotations(this.SubmoduleMap),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**)  `/lol/status/v4/platform-data`
         */
        status: (): GetLeaguePlatformData => new GetLeaguePlatformData(this.SubmoduleMap),
        /**
         * Object containing actions corresponding to the `/lol/clash` set of endpoints.
         */
        clash: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/players/by-summoner/{summonerId}`
             */
            players: (): GetClashPlayers => new GetClashPlayers(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/teams/{teamId}`
             */
            team: (): GetClashTeam => new GetClashTeam(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/tournaments/by-team/{teamId}`
             * - (**GET**) `/lol/clash/v1/tournaments/{tournamentId}`
             */
            tournament: (): GetClashTournament => new GetClashTournament(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/tournaments`
             */
            upcoming: (): GetUpcomingClashTournaments => new GetUpcomingClashTournaments(this.SubmoduleMap),
        },
        /**
         * Object containing actions corresponding to the `/lol/spectator` set of endpoints.
         */
        spectator: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}`
             */
            active: (): GetCurrentGameInfo => new GetCurrentGameInfo(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/spectator/v4/featured-games`
             */
            featured: (): GetFeaturedGames => new GetFeaturedGames(this.SubmoduleMap),
        },
        /**
         * Object containing actions corresponding to the `/lol/tournament` set of endpoints.
         * Note that these endpoints require a tournament-approved **production** key to use.
         * Please visit [here](https://developer.riotgames.com) for more information.
         */
        tournament: {
            /**
             * Object containing actions corresponding to the `/lol/tournament/v4/codes` set of endpoints.
             */
            code: {
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**POST**) `/lol/tournament/v4/codes`
                 */
                create: (): PostTournamentCodes => new PostTournamentCodes(this.SubmoduleMap),
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**GET**) `/lol/tournament/v4/codes/{tournamentCode}`
                 */
                get: (): GetTournamentCodes => new GetTournamentCodes(this.SubmoduleMap),
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**PUT**) `/lol/tournament/v4/codes/{tournamentCode}`
                 */
                update: (): PutTournamentCodes => new PutTournamentCodes(this.SubmoduleMap),
            },
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/tournament/v4/lobby-events/by-code/{tournamentCode}`
             */
            event: (): GetLobbyEvents => new GetLobbyEvents(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**POST**) `/lol/tournament/v4/providers`
             */
            provider: (): PostProviders => new PostProviders(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**POST**) `/lol/tournament/v4/tournaments`
             */
            tournament: (): PostTournaments => new PostTournaments(this.SubmoduleMap),
        },
    }

    /**
     * Object containing actions corresponding to the the `/riot` set of endpoints.
     */
    public riot = {
        /**
         * Object containing actions corresponding to the the `/riot/account` set of endpoints.
         */
        account: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/riot/account/v1/accounts/by-puuid/{puuid}`
             * - (**GET**) `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`
             */
            account: (): GetAccount => new GetAccount(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}`
             */
            activeShard: (): GetActiveShard => new GetActiveShard(this.SubmoduleMap),
        },
    }

    /**
     * Object containing actions corresponding to the the `/lor` set of endpoints.
     */
    public lor = {
        /**
         * Object containing actions corresponding to the the `/lor/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/match/v1/matches/{matchId}`
             */
            match: (): GetLorMatch => new GetLorMatch(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/match/v1/matches/by-puuid/{puuid}/ids`
             */
            list: (): GetLorMatchlist => new GetLorMatchlist(this.SubmoduleMap),
        },
        ranked: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            leaderboard: (): GetLorRankedLeaderboard => new GetLorRankedLeaderboard(this.SubmoduleMap),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lor/status/v1/platform-data`
         */
        status: (): GetLorPlatformData => new GetLorPlatformData(this.SubmoduleMap),
    }

    /**
     * Object containing actions corresponding to the the `/tft` set of endpoints.
     */
    public tft = {
        /**
         * Object containing actions corresponding to the the `/tft/league` set of endpoints.
         */
        league: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/tft/league/v1/entries/by-summoner/{encryptedSummonerId}`
             * - (**GET**) `/tft/league/v1/entries/{tier}/{division}`
             */
            entries: (): GetTFTLeagueEntries => new GetTFTLeagueEntries(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/tft/league/v1/challenger`
             * - (**GET**) `/tft/league/v1/grandmaster`
             * - (**GET**) `/tft/league/v1/master`
             * - (**GET**) `/tft/league/v1/leagues/{leagueId} `
             */
            league: (): GetTFTLeagueList => new GetTFTLeagueList(this.SubmoduleMap),
        },
        /**
         * Object containing actions corresponding to the the `/tft/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            match: (): GetTFTMatch => new GetTFTMatch(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            list: (): GetTFTMatchlist => new GetTFTMatchlist(this.SubmoduleMap),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lor/ranked/v1/leaderboards`
         */
        summoner: (): GetTFTSummoner => new GetTFTSummoner(this.SubmoduleMap),
    }

    /**
     * Object containing actions corresponding to the the `/val` set of endpoints.
     */
    public val = {
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/val/content/v1/contents`
         */
        content: (): GetValorantContent => new GetValorantContent(this.SubmoduleMap),
        /**
         * Object containing actions corresponding to the the `/val/match` set of endpoints.
         * Note that these endpoints require a Valorant-approved **production** key to use.
         * Please visit [here](https://developer.riotgames.com) for more information.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/matches/{matchId}`
             */
            match: (): GetValorantMatch => new GetValorantMatch(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/matchlists/by-puuid/{puuid}`
             */
            list: (): GetValorantMatchlist => new GetValorantMatchlist(this.SubmoduleMap),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/recent-matches/by-queue/{queue}`
             */
            recent: (): GetValorantRecentMatches => new GetValorantRecentMatches(this.SubmoduleMap),
        },
        /**
         * Object containing actions corresponding to the the `/val/ranked` set of endpoints.
         */
        ranked: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/ranked/v1/leaderboards/by-act/{actId}`
             */
            leaderboard: (): GetValorantRankedLeaderboard => new GetValorantRankedLeaderboard(this.SubmoduleMap),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/val/status/v1/platform-data`
         */
        status: (): GetValorantPlatformData => new GetValorantPlatformData(this.SubmoduleMap),
    }

    /**
     * Object containing enums corresponding to different API regions.
     */
    public regions = {
        lol: LeagueRegion,
        val: ValorantRegion,
        riot: RiotRegion,
    };

    /**
     * Object containing enums corresponding to different game queue types.
     */
    public queues = {
        lol: LeagueQueue,
        val: ValorantQueue,
    };

    /**
     * Enum corresponding to ranked tiers in TFT and League of Legends.
     */
    public tiers: typeof Tier = Tier;

    /**
     * Enum corresponding to ranked divisions in TFT and League of Legends.
     */
    public divisions: typeof Division = Division;

    /**
     * Enum corresponding to games for the
     * `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}` endpoint.
     */
    public games: typeof Game = Game;
}

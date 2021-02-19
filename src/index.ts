import debug from 'debug';
import {
    RiotAPIModule, Tier, Division, Game,
    ValorantRegion, LeagueRegion, RiotRegion,
    LeagueQueue, ValorantQueue, DataDragonRegion,
} from './riot-api';
import { getConfig, validate } from './galeforce/configs/default';
import { ConfigInterface } from './galeforce/interfaces/config';
import { Cache } from './galeforce/caches/cache';
import { RedisCache } from './galeforce/caches/redis';
import { NullCache } from './galeforce/caches/null';
import SubmoduleMap from './galeforce/interfaces/submodule-map';
import GetMatch from './galeforce/actions/lol/match/match';
import GetSummoner from './galeforce/actions/lol/summoner';
import GetThirdPartyCode from './galeforce/actions/lol/third-party-code';
import GetTimeline from './galeforce/actions/lol/match/timeline';
import GetMatchlist from './galeforce/actions/lol/match/matchlist';
import GetMasteryList from './galeforce/actions/lol/champion-mastery/by-summoner';
import GetLeagueEntries from './galeforce/actions/lol/league/entries';
import GetLeagueList from './galeforce/actions/lol/league/leagues';
import GetLeaguePlatformData from './galeforce/actions/lol/lol-status';
import GetChampionRotations from './galeforce/actions/lol/champion';
import GetClashPlayers from './galeforce/actions/lol/clash/players';
import GetClashTeam from './galeforce/actions/lol/clash/teams';
import GetClashTournament from './galeforce/actions/lol/clash/tournaments';
import GetTournamentMatches from './galeforce/actions/lol/match/tournament-matches';
import GetCurrentGameInfo from './galeforce/actions/lol/spectator/active-games';
import GetFeaturedGames from './galeforce/actions/lol/spectator/featured-games';
import GetMasteryScore from './galeforce/actions/lol/champion-mastery/score';
import GetAccount from './galeforce/actions/riot/account/account';
import GetActiveShard from './galeforce/actions/riot/account/active-shard';
import PostTournamentCodes from './galeforce/actions/lol/tournament/create-codes';
import GetTournamentCodes from './galeforce/actions/lol/tournament/get-tournament-by-code';
import PutTournamentCodes from './galeforce/actions/lol/tournament/update-tournament';
import PostProviders from './galeforce/actions/lol/tournament/providers';
import PostTournaments from './galeforce/actions/lol/tournament/tournaments';
import GetLobbyEvents from './galeforce/actions/lol/tournament/lobby-events';
import GetUpcomingClashTournaments from './galeforce/actions/lol/clash/upcoming-tournaments';
import GetLorMatch from './galeforce/actions/lor/lor-match/match';
import GetLorMatchlist from './galeforce/actions/lor/lor-match/matchlist';
import GetLorRankedLeaderboard from './galeforce/actions/lor/lor-ranked/leaderboard';
import GetLorPlatformData from './galeforce/actions/lor/lor-status';
import GetTFTLeagueEntries from './galeforce/actions/tft/tft-league/entries';
import GetTFTLeagueList from './galeforce/actions/tft/tft-league/leagues';
import GetTFTMatch from './galeforce/actions/tft/tft-match/match';
import GetTFTMatchlist from './galeforce/actions/tft/tft-match/matchlist';
import GetTFTSummoner from './galeforce/actions/tft/tft-summoner';
import GetValorantContent from './galeforce/actions/valorant/val-content/contents';
import GetValorantMatch from './galeforce/actions/valorant/val-match/match';
import GetValorantMatchlist from './galeforce/actions/valorant/val-match/matchlist';
import GetValorantRecentMatches from './galeforce/actions/valorant/val-match/recent-matches';
import GetValorantRankedLeaderboard from './galeforce/actions/valorant/val-ranked/leaderboard';
import GetValorantPlatformData from './galeforce/actions/valorant/val-status';
import GetMasteryByChampion from './galeforce/actions/lol/champion-mastery/by-champion';
import GetDataDragonVersions from './galeforce/actions/data-dragon/versions';
import GetDataDragonRegionInfo from './galeforce/actions/data-dragon/regions';
import GetDataDragonLanguages from './galeforce/actions/data-dragon/languages';
import GetDataDragonChampionList from './galeforce/actions/data-dragon/champion-list';
import GetDataDragonChampionJSON from './galeforce/actions/data-dragon/champion';
import GetDataDragonSplashArt from './galeforce/actions/data-dragon/splash-art';
import GetDataDragonLoadingArt from './galeforce/actions/data-dragon/loading-art';
import GetDataDragonChampionSquareArt from './galeforce/actions/data-dragon/champion-square-art';
import GetDataDragonSpellArt from './galeforce/actions/data-dragon/spell-art';
import GetDataDragonItemList from './galeforce/actions/data-dragon/item-list';
import GetDataDragonItemArt from './galeforce/actions/data-dragon/item-art';
import GetDataDragonSummonerSpellList from './galeforce/actions/data-dragon/summoner-spell-list';
import GetDataDragonProfileIconArt from './galeforce/actions/data-dragon/profile-icon-art';
import GetDataDragonProfileIconList from './galeforce/actions/data-dragon/profile-icon-list';
import GetDataDragonMinimapArt from './galeforce/actions/data-dragon/minimap-art';
import GetDataDragonSpriteArt from './galeforce/actions/data-dragon/sprite-art';
import GetDataDragonScoreboardArt from './galeforce/actions/data-dragon/scoreboard-icon-art';
import GetDataDragonChampionPassiveArt from './galeforce/actions/data-dragon/champion-passive-art';
import GetDataDragonTail from './galeforce/actions/data-dragon/dragon-tail';
import GetGameClientSwagger from './galeforce/actions/game-client/swagger';
import GetGameClientOpenAPI from './galeforce/actions/game-client/open-api';
import GetLiveClientAllGameData from './galeforce/actions/game-client/live-client-data/all-game-data';
import GetLiveClientActivePlayer from './galeforce/actions/game-client/live-client-data/active-player';
import GetLiveClientActivePlayerName from './galeforce/actions/game-client/live-client-data/active-player-name';
import GetLiveClientActivePlayerAbilities from './galeforce/actions/game-client/live-client-data/active-player-abilities';
import GetLiveClientActivePlayerRunes from './galeforce/actions/game-client/live-client-data/active-player-runes';
import GetLiveClientPlayerList from './galeforce/actions/game-client/live-client-data/player-list';
import GetLiveClientPlayerScores from './galeforce/actions/game-client/live-client-data/player-scores';
import GetLiveClientPlayerSummonerSpells from './galeforce/actions/game-client/live-client-data/player-summoner-spells';
import GetLiveClientPlayerRunes from './galeforce/actions/game-client/live-client-data/player-runes';
import GetLiveClientPlayerItems from './galeforce/actions/game-client/live-client-data/player-items';
import GetLiveClientEvents from './galeforce/actions/game-client/live-client-data/events';
import GetLiveClientGameStats from './galeforce/actions/game-client/live-client-data/game-stats';

class Galeforce {
    /**
     * The configuration for the module instance. Can only be set
     * in the constructor.
     */
    readonly config: ConfigInterface;

    private submodules: SubmoduleMap;

    /**
     * Initializes the Galeforce module with a provided configuration object.
     * The configuration object is verified using a JSON schema generated from the
     * {@link ConfigInterface} interface.
     * @param options A JSON configuration object or a path to a valid YAML file.
     * @throws Will throw an Error if provided an invalid configuration file or object.
     */
    constructor(options: ConfigInterface | string) {
        this.config = typeof options === 'string' ? getConfig(options) : options;

        if (this.config.debug) {
            this.config.debug.forEach((module) => {
                const previouslyEnabled = debug.disable();
                debug.enable(`${previouslyEnabled},galeforce:${module}`);
            });
        }

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

        this.submodules = { RiotAPI, cache };
    }

    /**
     * Object containing actions corresponding to the `/lol` set of endpoints.
     */
    public lol = {
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lol/summoner/v4/summoners/by-account/{encryptedAccountId}`
         * - (**GET**) `/lol/summoner/v4/summoners/by-name/{summonerName}`
         * - (**GET**) `/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}`
         * - (**GET**) `/lol/summoner/v4/summoners/{encryptedSummonerId}`
         */
        summoner: (): GetSummoner => new GetSummoner(this.submodules),
        /**
         * Object containing actions corresponding to the `/lol/champion-mastery` set of endpoints.
         */
        mastery: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}`
             */
            list: (): GetMasteryList => new GetMasteryList(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}`
             */
            champion: (): GetMasteryByChampion => new GetMasteryByChampion(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}`
             */
            score: (): GetMasteryScore => new GetMasteryScore(this.submodules),
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
            entries: (): GetLeagueEntries => new GetLeagueEntries(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/league/v4/challengerleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/grandmasterleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/masterleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/entries/by-summoner/{encryptedSummonerId}`
             */
            league: (): GetLeagueList => new GetLeagueList(this.submodules),
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
            match: (): GetMatch => new GetMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v4/timelines/by-match/{matchId}`
             */
            timeline: (): GetTimeline => new GetTimeline(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v4/matchlists/by-account/{encryptedAccountId}`
             */
            list: (): GetMatchlist => new GetMatchlist(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v4/matches/{matchId}/by-tournament-code/{tournamentCode}`
             */
            tournament: (): GetTournamentMatches => new GetTournamentMatches(this.submodules),
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
            thirdPartyCode: (): GetThirdPartyCode => new GetThirdPartyCode(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**)  `/lol/platform/v3/champion-rotations`
             */
            championRotations: (): GetChampionRotations => new GetChampionRotations(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**)  `/lol/status/v4/platform-data`
         */
        status: (): GetLeaguePlatformData => new GetLeaguePlatformData(this.submodules),
        /**
         * Object containing actions corresponding to the `/lol/clash` set of endpoints.
         */
        clash: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/players/by-summoner/{summonerId}`
             */
            players: (): GetClashPlayers => new GetClashPlayers(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/teams/{teamId}`
             */
            team: (): GetClashTeam => new GetClashTeam(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/tournaments/by-team/{teamId}`
             * - (**GET**) `/lol/clash/v1/tournaments/{tournamentId}`
             */
            tournament: (): GetClashTournament => new GetClashTournament(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/tournaments`
             */
            upcoming: (): GetUpcomingClashTournaments => new GetUpcomingClashTournaments(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/lol/spectator` set of endpoints.
         */
        spectator: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}`
             */
            active: (): GetCurrentGameInfo => new GetCurrentGameInfo(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/spectator/v4/featured-games`
             */
            featured: (): GetFeaturedGames => new GetFeaturedGames(this.submodules),
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
                create: (): PostTournamentCodes => new PostTournamentCodes(this.submodules),
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**GET**) `/lol/tournament/v4/codes/{tournamentCode}`
                 */
                get: (): GetTournamentCodes => new GetTournamentCodes(this.submodules),
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**PUT**) `/lol/tournament/v4/codes/{tournamentCode}`
                 */
                update: (): PutTournamentCodes => new PutTournamentCodes(this.submodules),
            },
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/tournament/v4/lobby-events/by-code/{tournamentCode}`
             */
            event: (): GetLobbyEvents => new GetLobbyEvents(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**POST**) `/lol/tournament/v4/providers`
             */
            provider: (): PostProviders => new PostProviders(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**POST**) `/lol/tournament/v4/tournaments`
             */
            tournament: (): PostTournaments => new PostTournaments(this.submodules),
        },
    }

    /**
     * Object containing actions corresponding to the `/riot` set of endpoints.
     */
    public riot = {
        /**
         * Object containing actions corresponding to the `/riot/account` set of endpoints.
         */
        account: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/riot/account/v1/accounts/by-puuid/{puuid}`
             * - (**GET**) `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`
             */
            account: (): GetAccount => new GetAccount(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}`
             */
            activeShard: (): GetActiveShard => new GetActiveShard(this.submodules),
        },
    }

    /**
     * Object containing actions corresponding to the `/lor` set of endpoints.
     */
    public lor = {
        /**
         * Object containing actions corresponding to the `/lor/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/match/v1/matches/{matchId}`
             */
            match: (): GetLorMatch => new GetLorMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/match/v1/matches/by-puuid/{puuid}/ids`
             */
            list: (): GetLorMatchlist => new GetLorMatchlist(this.submodules),
        },
        ranked: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            leaderboard: (): GetLorRankedLeaderboard => new GetLorRankedLeaderboard(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lor/status/v1/platform-data`
         */
        status: (): GetLorPlatformData => new GetLorPlatformData(this.submodules),
    }

    /**
     * Object containing actions corresponding to the `/tft` set of endpoints.
     */
    public tft = {
        /**
         * Object containing actions corresponding to the `/tft/league` set of endpoints.
         */
        league: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/tft/league/v1/entries/by-summoner/{encryptedSummonerId}`
             * - (**GET**) `/tft/league/v1/entries/{tier}/{division}`
             */
            entries: (): GetTFTLeagueEntries => new GetTFTLeagueEntries(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/tft/league/v1/challenger`
             * - (**GET**) `/tft/league/v1/grandmaster`
             * - (**GET**) `/tft/league/v1/master`
             * - (**GET**) `/tft/league/v1/leagues/{leagueId} `
             */
            league: (): GetTFTLeagueList => new GetTFTLeagueList(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/tft/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            match: (): GetTFTMatch => new GetTFTMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            list: (): GetTFTMatchlist => new GetTFTMatchlist(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lor/ranked/v1/leaderboards`
         */
        summoner: (): GetTFTSummoner => new GetTFTSummoner(this.submodules),
    }

    /**
     * Object containing actions corresponding to the `/val` set of endpoints.
     */
    public val = {
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/val/content/v1/contents`
         */
        content: (): GetValorantContent => new GetValorantContent(this.submodules),
        /**
         * Object containing actions corresponding to the `/val/match` set of endpoints.
         * Note that these endpoints require a Valorant-approved **production** key to use.
         * Please visit [here](https://developer.riotgames.com) for more information.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/matches/{matchId}`
             */
            match: (): GetValorantMatch => new GetValorantMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/matchlists/by-puuid/{puuid}`
             */
            list: (): GetValorantMatchlist => new GetValorantMatchlist(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/recent-matches/by-queue/{queue}`
             */
            recent: (): GetValorantRecentMatches => new GetValorantRecentMatches(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/val/ranked` set of endpoints.
         */
        ranked: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/ranked/v1/leaderboards/by-act/{actId}`
             */
            leaderboard: (): GetValorantRankedLeaderboard => new GetValorantRankedLeaderboard(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/val/status/v1/platform-data`
         */
        status: (): GetValorantPlatformData => new GetValorantPlatformData(this.submodules),
    }

    /**
     * Object containing actions corresponding to Data Dragon endpoints.
     */
    public ddragon = {
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/cdn/dragontail-{version}.tgz`
         *
         * Swaps to a *.zip* file automatically when fetching data for patch 10.10.5.
         */
        tail: (): GetDataDragonTail => new GetDataDragonTail(this.submodules),
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/api/versions.json`
         */
        versions: (): GetDataDragonVersions => new GetDataDragonVersions(this.submodules),
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/realms/{region}.json`
         */
        realm: (): GetDataDragonRegionInfo => new GetDataDragonRegionInfo(this.submodules),
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/cdn/languages.json`
         */
        languages: (): GetDataDragonLanguages => new GetDataDragonLanguages(this.submodules),
        /**
         *
         */
        champion: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/champion.json`
             */
            list: (): GetDataDragonChampionList => new GetDataDragonChampionList(this.submodules),
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/champion/{champion}.json`
             */
            details: (): GetDataDragonChampionJSON => new GetDataDragonChampionJSON(this.submodules),
            art: {
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/img/champion/splash/{champion}_{skin}.jpg`
                 */
                splash: (): GetDataDragonSplashArt => new GetDataDragonSplashArt(this.submodules),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/img/champion/loading/{champion}_{skin}.jpg`
                 */
                loading: (): GetDataDragonLoadingArt => new GetDataDragonLoadingArt(this.submodules),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/{version}/img/champion/{champion}.png`
                 */
                icon: (): GetDataDragonChampionSquareArt => new GetDataDragonChampionSquareArt(this.submodules),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/{version}/img/passive/{spell}.png`
                 */
                passive: (): GetDataDragonChampionPassiveArt => new GetDataDragonChampionPassiveArt(this.submodules),
            },
        },
        spell: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/spell/{spell}.png`
             */
            art: (): GetDataDragonSpellArt => new GetDataDragonSpellArt(this.submodules),
        },
        item: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/item.json`
             */
            list: (): GetDataDragonItemList => new GetDataDragonItemList(this.submodules),
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/item/{assetId}.png`
             */
            art: (): GetDataDragonItemArt => new GetDataDragonItemArt(this.submodules),
        },
        summonerSpell: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/summoner.json`
             */
            list: (): GetDataDragonSummonerSpellList => new GetDataDragonSummonerSpellList(this.submodules),
        },
        profileIcon: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/profileicon.json`
             */
            list: (): GetDataDragonProfileIconList => new GetDataDragonProfileIconList(this.submodules),
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/profileicon/{assetId}.png`
             */
            art: (): GetDataDragonProfileIconArt => new GetDataDragonProfileIconArt(this.submodules),
        },
        minimap: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/map/map{assetId}.png`
             */
            art: (): GetDataDragonMinimapArt => new GetDataDragonMinimapArt(this.submodules),
        },
        sprite: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/sprite/spell{assetId}.png`
             */
            art: (): GetDataDragonSpriteArt => new GetDataDragonSpriteArt(this.submodules),
        },
        scoreboard: {
            art: {
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/champion.png`
                 */
                champion: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'champion'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/items.png`
                 */
                items: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'items'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/minion.png`
                 */
                minion: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'minion'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/score.png`
                 */
                score: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'score'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/spells.png`
                 */
                spells: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'spells'),
            },
        },
    }

    /**
     * Object containing functions corresponding to the Live Client Data endpoints.
     * The Live Client Data API is hosted locally during a League of Legends match
     * at https://127.0.0.1/2999.
     */
    public gc = {
        swagger: (): GetGameClientSwagger => new GetGameClientSwagger(this.submodules),
        openAPI: (): GetGameClientOpenAPI => new GetGameClientOpenAPI(this.submodules),
        all: (): GetLiveClientAllGameData => new GetLiveClientAllGameData(this.submodules),
        active: {
            player: (): GetLiveClientActivePlayer => new GetLiveClientActivePlayer(this.submodules),
            name: (): GetLiveClientActivePlayerName => new GetLiveClientActivePlayerName(this.submodules),
            abilities: (): GetLiveClientActivePlayerAbilities => new GetLiveClientActivePlayerAbilities(this.submodules),
            runes: (): GetLiveClientActivePlayerRunes => new GetLiveClientActivePlayerRunes(this.submodules),
        },
        player: {
            list: (): GetLiveClientPlayerList => new GetLiveClientPlayerList(this.submodules),
            scores: (): GetLiveClientPlayerScores => new GetLiveClientPlayerScores(this.submodules),
            summonerSpells: (): GetLiveClientPlayerSummonerSpells => new GetLiveClientPlayerSummonerSpells(this.submodules),
            runes: (): GetLiveClientPlayerRunes => new GetLiveClientPlayerRunes(this.submodules),
            items: (): GetLiveClientPlayerItems => new GetLiveClientPlayerItems(this.submodules),
        },
        events: (): GetLiveClientEvents => new GetLiveClientEvents(this.submodules),
        stats: (): GetLiveClientGameStats => new GetLiveClientGameStats(this.submodules),
    };

    /**
     * Object containing enums corresponding to different API regions.
     */
    public regions = {
        lol: LeagueRegion,
        val: ValorantRegion,
        riot: RiotRegion,
        ddragon: DataDragonRegion,
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

export = Galeforce;

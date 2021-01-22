/* eslint-disable no-template-curly-in-string */

const ACCOUNT = {
    PUUID: 'https://${region}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}',
    RIOT_ID: 'https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}',
    ACTIVE_SHARDS: 'https://${region}.api.riotgames.com/riot/account/v1/active-shards/by-game/${game}/by-puuid/${puuid}',
};

const SUMMONER = {
    SUMMONER_NAME: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}',
    PUUID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}',
    ACCOUNT_ID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-account/${accountId}',
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}',
};

const CHAMPION_MASTERY = {
    SUMMONER_ID: {
        LIST: 'https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}',
        CHAMPION: 'https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}',
    },
    SCORE: 'https://${region}.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${summonerId}',
};

const SPECTATOR = {
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}',
    FEATURED: 'https://${region}.api.riotgames.com/lol/spectator/v4/featured-games',
};

const LEAGUE = {
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}',
    LEAGUE_ID: 'https://${region}.api.riotgames.com/lol/league/v4/leagues/${leagueId}',
    ENTRIES_BY_RANK: 'https://${region}.api.riotgames.com/lol/league/v4/entries/${queue}/${tier}/${division}',
    CHALLENGER_LEAGUE: 'https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}',
    GRANDMASTER_LEAGUE: 'https://${region}.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/${queue}',
    MASTER_LEAGUE: 'https://${region}.api.riotgames.com/lol/league/v4/masterleagues/by-queue/${queue}',
    ENTRIES_BY_RANK_EXP: 'https://${region}.api.riotgames.com/lol/league-exp/v4/entries/${queue}/${tier}/${division}',
};

const MATCH = {
    MATCHLIST: {
        ACCOUNT_ID: 'https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}',
    },
    MATCH: {
        MATCH_ID: 'https://${region}.api.riotgames.com/lol/match/v4/matches/${matchId}',
        MATCH_ID_TOURNAMENT: 'https://${region}.api.riotgames.com/lol/match/v4/matches/${matchId}/by-tournament-code/${tournamentCode}',
        TOURNAMENT_CODE: 'https://${region}.api.riotgames.com/lol/match/v4/matches/by-tournament-code/${tournamentCode}/ids',
    },
    TIMELINE: {
        MATCH_ID: 'https://${region}.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}',
    },
};

const PLATFORM = {
    THIRD_PARTY_CODE: 'https://${region}.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/${summonerId}',
};

const STATUS = {
    PLATFORM_DATA: 'https://${region}.api.riotgames.com/lol/status/v4/platform-data',
};

const CHAMPION = {
    CHAMPION_ROTATIONS: 'https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations',
};

const CLASH = {
    PLAYERS: 'https://${region}.api.riotgames.com/lol/clash/v1/players/by-summoner/${summonerId}',
    TEAMS: 'https://${region}.api.riotgames.com/lol/clash/v1/teams/${teamId}',
    TOURNAMENTS: {
        ALL: 'https://${region}.api.riotgames.com/lol/clash/v1/tournaments',
        TEAM: 'https://${region}.api.riotgames.com/lol/clash/v1/tournaments/by-team/${teamId}',
        TOURNAMENT: 'https://${region}.api.riotgames.com/lol/clash/v1/tournaments/${tournamentId}',
    },
};

const TOURNAMENT = {
    CODES: {
        CREATE: 'https://${region}.api.riotgames.com/lol/tournament/v4/codes',
        BY_CODE: 'https://${region}.api.riotgames.com/lol/tournament/v4/codes/${tournamentCode}',
    },
    EVENTS: 'https://${region}.api.riotgames.com/lol/tournament/v4/lobby-events/by-code/${tournamentCode}',
    PROVIDERS: 'https://${region}.api.riotgames.com/lol/tournament/v4/providers',
    TOURNAMENTS: 'https://${region}.api.riotgames.com/lol/tournament/v4/tournaments',
};

const DATA_DRAGON = {
    CHAMPION: 'http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json',
    SEASONS: 'http://static.developer.riotgames.com/docs/lol/seasons.json',
    QUEUES: 'http://static.developer.riotgames.com/docs/lol/queues.json',
    MAPS: 'http://static.developer.riotgames.com/docs/lol/maps.json',
    GAME_MODES: 'http://static.developer.riotgames.com/docs/lol/gameModes.json',
    GAME_TYPES: 'http://static.developer.riotgames.com/docs/lol/gameTypes.json',
};

export default {
    ACCOUNT,
    SUMMONER,
    CHAMPION_MASTERY,
    SPECTATOR,
    LEAGUE,
    MATCH,
    PLATFORM,
    STATUS,
    CHAMPION,
    CLASH,
    TOURNAMENT,
    DATA_DRAGON,
};

/* eslint-disable no-template-curly-in-string */

export const ACCOUNT = {
    PUUID: 'https://${region}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}',
    RIOT_ID: 'https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}',
    ACTIVE_SHARDS: 'https://${region}.api.riotgames.com/riot/account/v1/active-shards/by-game/${game}/by-puuid/${puuid}',
};

export const SUMMONER = {
    SUMMONER_NAME: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}',
    PUUID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}',
    ACCOUNT_ID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-account/${accountId}',
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}',
};

export const CHAMPION_MASTERY = {
    SUMMONER_ID: {
        LIST: 'https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}',
        CHAMPION: 'https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}',
    },
    SCORE: 'https://${region}.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${summonerId}',
};

export const SPECTATOR = {
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}',
    FEATURED: 'https://${region}.api.riotgames.com/lol/spectator/v4/featured-games',
};

export const LEAGUE = {
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}',
    LEAGUE_ID: 'https://${region}.api.riotgames.com/lol/league/v4/leagues/${leagueId}',
    ENTRIES_BY_RANK: 'https://${region}.api.riotgames.com/lol/league/v4/entries/${queue}/${tier}/${division}',
    CHALLENGER_LEAGUE: 'https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}',
    GRANDMASTER_LEAGUE: 'https://${region}.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/${queue}',
    MASTER_LEAGUE: 'https://${region}.api.riotgames.com/lol/league/v4/masterleagues/by-queue/${queue}',
    ENTRIES_BY_RANK_EXP: 'https://${region}.api.riotgames.com/lol/league-exp/v4/entries/${queue}/${tier}/${division}',
};

export const MATCH = {
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

export const PLATFORM = {
    THIRD_PARTY_CODE: 'https://${region}.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/${summonerId}',
};

export const STATUS = {
    PLATFORM_DATA: 'https://${region}.api.riotgames.com/lol/status/v4/platform-data',
};

export const CHAMPION = {
    CHAMPION_ROTATIONS: 'https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations',
};

export const CLASH = {
    PLAYERS: 'https://${region}.api.riotgames.com/lol/clash/v1/players/by-summoner/${summonerId}',
    TEAMS: 'https://${region}.api.riotgames.com/lol/clash/v1/teams/${teamId}',
    TOURNAMENTS: {
        ALL: 'https://${region}.api.riotgames.com/lol/clash/v1/tournaments',
        TEAM: 'https://${region}.api.riotgames.com/lol/clash/v1/tournaments/by-team/${teamId}',
        TOURNAMENT: 'https://${region}.api.riotgames.com/lol/clash/v1/tournaments/${tournamentId}',
    },
};

export const TOURNAMENT = {
    CODES: {
        CREATE: 'https://${region}.api.riotgames.com/lol/tournament/v4/codes',
        BY_CODE: 'https://${region}.api.riotgames.com/lol/tournament/v4/codes/${tournamentCode}',
    },
    EVENTS: 'https://${region}.api.riotgames.com/lol/tournament/v4/lobby-events/by-code/${tournamentCode}',
    PROVIDERS: 'https://${region}.api.riotgames.com/lol/tournament/v4/providers',
    TOURNAMENTS: 'https://${region}.api.riotgames.com/lol/tournament/v4/tournaments',
};

export const LOR_MATCH = {
    MATCH: 'https://${region}.api.riotgames.com/lor/match/v1/matches/${matchId}',
    MATCHLIST: 'https://${region}.api.riotgames.com/lor/match/v1/matches/by-puuid/${puuid}/ids',
};

export const LOR_RANKED = {
    LEADERBOARDS: 'https://${region}.api.riotgames.com/lor/ranked/v1/leaderboards',
};

export const LOR_STATUS = {
    PLATFORM_DATA: 'https://${region}.api.riotgames.com/lor/status/v1/platform-data',
};

export const TFT_LEAGUE = {
    SUMMONER_ID: 'https://${region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}',
    LEAGUE_ID: 'https://${region}.api.riotgames.com/tft/league/v1/leagues/${leagueId}',
    ENTRIES_BY_RANK: 'https://${region}.api.riotgames.com/tft/league/v1/entries/${tier}/${division}',
    CHALLENGER_LEAGUE: 'https://${region}.api.riotgames.com/tft/league/v1/challenger',
    GRANDMASTER_LEAGUE: 'https://${region}.api.riotgames.com/tft/league/v1/grandmaster',
    MASTER_LEAGUE: 'https://${region}.api.riotgames.com/tft/league/v1/master',
};

export const TFT_MATCH = {
    MATCH: 'https://${region}.api.riotgames.com/tft/match/v1/matches/${matchId}',
    MATCHLIST: 'https://${region}.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids',
};

export const TFT_SUMMONER = {
    SUMMONER_NAME: 'https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}',
    PUUID: 'https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}',
    ACCOUNT_ID: 'https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-account/${accountId}',
    SUMMONER_ID: 'https://${region}.api.riotgames.com/tft/summoner/v1/summoners/${summonerId}',
};

export const VAL_CONTENT = {
    CONTENTS: 'https://${region}.api.riotgames.com/val/content/v1/contents',
};

export const VAL_MATCH = {
    MATCH: 'https://${region}.api.riotgames.com/val/match/v1/matches/${matchId}',
    MATCHLIST: 'https://${region}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}',
    RECENT: 'https://${region}.api.riotgames.com/val/match/v1/recent-matches/by-queue/${queue}',
};

export const VAL_RANKED = {
    LEADERBOARDS: 'https://${region}.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${actId}',
};

export const VAL_STATUS = {
    PLATFORM_DATA: 'https://${region}.api.riotgames.com/val/status/v1/platform-data',
};

export const DATA_DRAGON = {
    DRAGON_TAIL: 'https://ddragon.leagueoflegends.com/cdn/dragontail-${version}.tgz',
    DRAGON_TAIL_ZIP: 'https://ddragon.leagueoflegends.com/cdn/dragontail-${version}.zip',
    VERSIONS: 'https://ddragon.leagueoflegends.com/api/versions.json',
    REGIONS: 'https://ddragon.leagueoflegends.com/realms/${region}.json',
    LANGUAGES: 'https://ddragon.leagueoflegends.com/cdn/languages.json',
    CHAMPION_LIST: 'https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion.json',
    CHAMPION: 'https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion/${champion}.json',
    SPLASH_ART: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${skin}.jpg',
    LOADING_ART: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_${skin}.jpg',
    SQUARE_ART: 'https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}.png',
    CHAMPION_PASSIVE_ART: 'https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${spell}.png',
    SPELL_ART: 'https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell}.png',
    ITEM_LIST: 'https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/item.json',
    ITEM_ART: 'https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${assetId}.png',
    SUMMONER_SPELL_LIST: 'https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/summoner.json',
    PROFILE_ICON_LIST: 'https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/profileicon.json',
    PROFILE_ICON_ART: 'https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${assetId}.png',
    MINIMAP_ART: 'https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map${assetId}.png',
    SPRITES_ART: 'https://ddragon.leagueoflegends.com/cdn/${version}/img/sprite/spell${assetId}.png',
    SCOREBOARD_ICONS_CHAMPION_ART: 'https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/champion.png',
    SCOREBOARD_ICONS_ITEMS_ART: 'https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png',
    SCOREBOARD_ICONS_MINION_ART: 'https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png',
    SCOREBOARD_ICONS_SCORE_ART: 'https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png',
    SCOREBOARD_ICONS_SPELLS_ART: 'https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/spells.png',
};

export const STATIC = {
    SEASONS: 'http://static.developer.riotgames.com/docs/lol/seasons.json',
    QUEUES: 'http://static.developer.riotgames.com/docs/lol/queues.json',
    MAPS: 'http://static.developer.riotgames.com/docs/lol/maps.json',
    GAME_MODES: 'http://static.developer.riotgames.com/docs/lol/gameModes.json',
    GAME_TYPES: 'http://static.developer.riotgames.com/docs/lol/gameTypes.json',
};

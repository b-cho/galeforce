/* eslint-disable no-template-curly-in-string */

const SUMMONER = {
    SUMMONER_NAME: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}',
    PUUID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}',
    ACCOUNT_ID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-account/${accountId}',
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}',
};

const CHAMPION_MASTERY = {
    SUMMONER_ID: {
        LIST: 'https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}',
    },
};

const SPECTATOR = {
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}',
    FEATURED: 'https://${region}.api.riotgames.com/lol/spectator/v4/featured-games',
};

const LEAGUE = {
    SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}',
};

const MATCH = {
    MATCHLIST: {
        ACCOUNT_ID: 'https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}',
    },
    MATCH: {
        MATCH_ID: 'https://${region}.api.riotgames.com/lol/match/v4/matches/${matchId}',
    },
    TIMELINE: {
        MATCH_ID: 'https://${region}.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}',
    },
};

const PLATFORM = {
    THIRD_PARTY_CODE: {
        SUMMONER_ID: 'https://${region}.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/${summonerId}',
    },
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
    SUMMONER,
    CHAMPION_MASTERY,
    SPECTATOR,
    LEAGUE,
    MATCH,
    PLATFORM,
    DATA_DRAGON,
};

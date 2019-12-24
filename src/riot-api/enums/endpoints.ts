/* eslint-disable no-template-curly-in-string */

const SUMMONER = {
    SUMMONER_NAME: 'https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner-name}',
    PUUID: 'https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}',
};

const CHAMPION_MASTERY = {
    SUMMONER_ID: {
        LIST: 'https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner-id}',
        CHAMPION: 'https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner-id}/by-champion/${champion-id}',
    },
};

const SPECTATOR = {
    SUMMONER_ID: 'https://${server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner-id}',
    FEATURED: 'https://${server}.api.riotgames.com/lol/spectator/v4/featured-games',
};

const LEAGUE = {
    SUMMONER_ID: 'https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner-id}',
};

const MATCH = {
    MATCHLIST: {
        ACCOUNT_ID: 'https://${server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${account-id}',
        ACCOUNT_ID_INDEX: 'https://${server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${account-id}?endIndex=${end-index}',
    },
    MATCH: {
        MATCH_ID: 'https://${server}.api.riotgames.com/lol/match/v4/matches/${match-id}',
    },
    TIMELINE: {
        MATCH_ID: 'https://${server}.api.riotgames.com/lol/match/v4/timelines/by-match/${match-id}',
    },
};

const THIRD_PARTY = {
    CODE: 'https://${server}.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/${summoner-id}',
};

export default {
    SUMMONER,
    CHAMPION_MASTERY,
    SPECTATOR,
    LEAGUE,
    MATCH,
    THIRD_PARTY,
};

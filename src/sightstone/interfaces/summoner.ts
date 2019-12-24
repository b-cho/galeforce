/*
    The SummonerInterface is an interface to store summoner data in
    for relevant databases.
*/

interface SummonerLeagueInterface {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}

interface SummonerMasteryInterface {
    championId: number;
    championLevel: number;
    championPoints: number;
    lastPlayTime: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    tokensEarned: number;
    summonerId: string;
}

interface SummonerMatchInterface {
    platformId: string;
    gameId: number;
    champion: number;
    queue: number;
    season: number;
    timestamp: number;
    role: string;
    lane: string;
}

interface SummonerInterface {
    summoner: {
        id: string;
        accountId: string;
        puuid: string; // We assert that the puuid element exists and has type string.
        name: string;
        profileIconId: number;
        revisionDate: number;
        summonerLevel: number;
        server: string;
    };
    league: SummonerLeagueInterface[];
    mastery: SummonerMasteryInterface[];
    matchlist: {
        matches: SummonerMatchInterface[];
        startIndex: number;
        endIndex: number;
        totalGames: number;
    };
}

export default SummonerInterface;

/*
    The LeagueEntryDTO is an interface for league data returned from V4 endpoints.
*/

export interface MiniSeriesDTO {
    losses: number;
    progress: string;
    target: number;
    wins: number;
}

export interface LeagueEntryDTO {
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
    miniSeries?: MiniSeriesDTO;
}

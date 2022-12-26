/*
    The LeagueList is an interface for league data returned from V4 endpoints.
*/

import { MiniSeriesDTO } from './league-entry';

interface LeagueItemDTO {
    freshBlood: boolean;
    wins: number;
    summonerName: string;
    miniSeries?: MiniSeriesDTO;
    inactive: boolean;
    veteran: boolean;
    hotStreak: boolean;
    rank: string;
    leaguePoints: number;
    losses: number;
    summonerId: string;
}

export interface LeagueListDTO {
    leagueId: string;
    entries: LeagueItemDTO[];
    tier: string;
    name: string;
    queue: string;
}

/*
    The LeagueList is an interface for league data returned from V4 endpoints.
*/

import { MiniSeriesDTOInterface } from './league-entry';

interface LeagueItemInterface {
    freshBlood: boolean;
    wins: number;
    summonerName: string;
    miniSeries?: MiniSeriesDTOInterface;
    inactive: boolean;
    veteran: boolean;
    hotStreak: boolean;
    rank: string;
    leaguePoints: number;
    losses: number;
    summonerId: string;
}

export interface LeagueListInterface {
    leagueId: string;
    entries: LeagueItemInterface[];
    tier: string;
    name: string;
    queue: string;
}

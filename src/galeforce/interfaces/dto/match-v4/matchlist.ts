/*
    The MatchlistInterface is an interface for matchlist data returned from V4 endpoints.
*/

interface MatchReferenceInterface {
    platformId: string;
    gameId: number;
    champion: number;
    queue: number;
    season: number;
    timestamp: number;
    role: string;
    lane: string;
}

export interface MatchlistInterface {
    matches: MatchReferenceInterface[];
    startIndex: number;
    endIndex: number;
    totalGames: number;
}

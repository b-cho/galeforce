/*
    The MatchlistDTO is an interface for matchlist data returned from V4 endpoints.
*/

interface MatchReferenceDTO {
    platformId: string;
    gameId: number;
    champion: number;
    queue: number;
    season: number;
    timestamp: number;
    role: string;
    lane: string;
}

export interface MatchlistDTO {
    matches: MatchReferenceDTO[];
    startIndex: number;
    endIndex: number;
    totalGames: number;
}

interface MatchlistEntryInterface {
    matchId: string;
    gameStartTimeMillis: number;
    teamId: string;
}

export interface ValMatchlistInterface {
    puuid: string;
    history: MatchlistEntryInterface;
}
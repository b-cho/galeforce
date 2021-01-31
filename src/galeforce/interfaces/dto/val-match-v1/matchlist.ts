interface MatchlistEntryDTO {
    matchId: string;
    gameStartTimeMillis: number;
    teamId: string;
}

export interface ValMatchlistDTO {
    puuid: string;
    history: MatchlistEntryDTO;
}

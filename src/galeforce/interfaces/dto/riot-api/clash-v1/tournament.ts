/*
    The TournamentDTO is an interface for Clash tournament data returned from V1 endpoints.
*/

interface TournamentPhaseDTO {
    id: number;
    registrationTime: number;
    startTime: number;
    cancelled: boolean;
}

export interface TournamentDTO {
    id: number;
    themeId: number;
    nameKey: string;
    nameKeySecondary: string;
    schedule: TournamentPhaseDTO[];
}

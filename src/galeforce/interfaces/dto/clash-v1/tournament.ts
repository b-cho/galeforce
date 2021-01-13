/*
    The TournamentInterface is an interface for Clash tournament data returned from V1 endpoints.
*/

interface TournamentPhaseInterface {
    id: number;
    registrationTime: number;
    startTime: number;
    cancelled: boolean;
}

export interface TournamentInterface {
    id: number;
    themeId: number;
    nameKey: string;
    nameKeySecondary: string;
    schedule: TournamentPhaseInterface[];
}
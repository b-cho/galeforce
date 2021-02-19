interface PlayerDTO {
    name: string;
    rank: number;
    lp: number;
}

export interface LorLeaderboardDTO {
    players: PlayerDTO[];
}

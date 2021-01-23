interface PlayerInterface {
    name: string;
    rank: number;
    lp: number;
}

export interface LorLeaderboardInterface {
    players: PlayerInterface[];
}

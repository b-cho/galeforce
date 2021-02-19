interface PlayerDTO {
    puuid: string;
    gameName: string;
    tagLine: string;
    leaderboardRank: number;
    rankedRating: number;
    numberOfWins: number;
}

export interface ValLeaderboardDTO {
    shard: string;
    actId: string;
    totalPlayers: number;
    players: PlayerDTO[];
}

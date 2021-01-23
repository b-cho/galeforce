interface PlayerInterface {
    puuid: string;
    gameName: string;
    tagLine: string;
    leaderboardRank: number;
    rankedRating: number;
    numberOfWins: number;
}

export interface ValLeaderboardInterface {
    shard: string;
    actId: string;
    totalPlayers: number;
    players: PlayerInterface[];
}
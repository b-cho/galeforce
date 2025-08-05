interface TournamentTeamDTO {
    puuid: string;
}

export interface TournamentGameDTO {
    startTime: number;
    wininngTeam: TournamentTeamDTO[];
    losingTeam: TournamentTeamDTO[];
    shortCode: string;
    metaData: string;
    gameId: number;
    gameName: string;
    gameType: string;
    gameMap: number;
    gameMode: string;
    region: string;
}


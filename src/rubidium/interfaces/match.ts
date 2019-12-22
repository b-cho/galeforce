interface MatchInterface {
    gameId: number,
    gameCreation: number,
    gameDuration: number,
    gameMode: string,
    gameType: string,
    gameVersion: string,
    mapId: number,
    participantIdentities: object[],
    participants: object[],
    platformId: string,
    queueId: string,
    seasonId: string,
    teams: object[],
    timeline: object[]
};

export default MatchInterface;
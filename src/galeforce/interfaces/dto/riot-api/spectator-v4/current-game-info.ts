/*
    The CurrentGameInfoDTO is an interface for active spectator data returned from V4 endpoints.
*/

interface Perks {
    perkIds: number[];
    perkStyle: number;
    perkSubStyle: number;
}

interface GameCustomizationObjectDTO {
    category: string;
    content: string;
}

export interface BannedChampionDTO {
    championId: number;
    pickTurn: number;
    teamId: number;
}

export interface Observer {
    encryptionKey: string;
}

interface CurrentGameParticipantDTO {
    championId: number;
    perks: Perks;
    profileIconId: number;
    bot: boolean;
    teamId: number;
    summonerName: string;
    summonerId: string;
    spell1Id: number;
    spell2Id: number;
    gameCustomizationObjects: GameCustomizationObjectDTO[];
}

export interface CurrentGameInfoDTO {
    gameId: number;
    gameType: string;
    gameStartTime: number;
    mapId: number;
    gameLength: number;
    platformId: string;
    gameMode: string;
    bannedChampions: BannedChampionDTO[];
    gameQueueConfigId: number;
    observers: Observer;
    participants: CurrentGameParticipantDTO[];
}

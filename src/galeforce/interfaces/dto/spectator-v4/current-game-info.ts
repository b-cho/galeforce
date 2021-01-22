/*
    The CurrentGameInfoInterface is an interface for active spectator data returned from V4 endpoints.
*/

interface Perks {
    perkIds: number[];
    perkStyle: number;
    perkSubStyle: number;
}

interface GameCustomizationObjectInterface {
    category: string;
    content: string;
}

export interface BannedChampionInterface {
    championId: number;
    pickTurn: number;
    teamId: number;
}

export interface Observer {
    encryptionKey: string;
}

interface CurrentGameParticipantInterface {
    championId: number;
    perks: Perks;
    profileIconId: number;
    bot: boolean;
    teamId: number;
    summonerName: string;
    summonerId: string;
    spell1Id: number;
    spell2Id: number;
    gameCustomizationObjects: GameCustomizationObjectInterface[];
}

export interface CurrentGameInfoInterface {
    gameId: number;
    gameType: string;
    gameStartTime: number;
    mapId: number;
    gameLength: number;
    platformId: string;
    gameMode: string;
    bannedChampions: BannedChampionInterface[];
    gameQueueConfigId: number;
    observers: Observer;
    participants: CurrentGameParticipantInterface[];
}

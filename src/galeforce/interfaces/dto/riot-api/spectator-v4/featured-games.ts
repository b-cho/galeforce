/*
    The FeaturedGamesDTO is an interface for featured game data returned from V4 endpoints.
*/

import { BannedChampionDTO, Observer } from './current-game-info';

interface ParticipantDTO {
    bot: boolean;
    spell2Id: number;
    summonerName: string;
    championId: number;
    teamId: number;
    spell1Id: number;
}

interface FeaturedGameInfoDTO {
    gameMode: string;
    gameLength: number;
    mapId: number;
    gameType: string;
    bannedChampions: BannedChampionDTO[];
    gameId: number;
    observers: Observer;
    gameQueueConfigId: number;
    gameStartTime: number;
    participants: ParticipantDTO[];
    platformId: string;
}

export interface FeaturedGamesDTO {
    gameList: FeaturedGameInfoDTO[];
    clientRefreshInterval: number;
}

/*
    The FeaturedGamesInterface is an interface for featured game data returned from V4 endpoints.
*/

import { BannedChampionInterface, Observer } from './current-game-info';

interface ParticipantInterface {
    bot: boolean;
    spell2Id: number;
    summonerName: string;
    championId: number;
    teamId: number;
    spell1Id: number;
}

interface FeaturedGameInfoInterface {
    gameMode: string;
    gameLength: number;
    mapId: number;
    gameType: string;
    bannedChampions: BannedChampionInterface[];
    gameId: number;
    observers: Observer;
    gameQueueConfigId: number;
    gameStartTime: number;
    participants: ParticipantInterface[];
    platformId: string;
}

export interface FeaturedGamesInterface {
    gameList: FeaturedGameInfoInterface[];
    clientRefreshInterval: number;
}

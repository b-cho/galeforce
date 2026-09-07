/*
    The FeaturedGamesDTO is an interface for featured game data.

    Note that Riot has removed the featured games endpoints from spectator-v5 and
    spectator-tft-v5, so this interface is retained only for backwards compatibility
    and is no longer associated with any action.
*/

import { BannedChampionDTO, Observer } from './current-game-info';

interface ParticipantDTO {
    bot?: boolean;
    spell2Id: number;
    puuid?: string;
    riotId?: string;
    summonerName?: string;
    profileIconId?: number;
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
    gameStartTime?: number;
    participants: ParticipantDTO[];
    platformId: string;
}

export interface FeaturedGamesDTO {
    gameList: FeaturedGameInfoDTO[];
    clientRefreshInterval?: number;
}

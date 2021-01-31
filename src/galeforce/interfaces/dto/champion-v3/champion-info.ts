/*
    The ChampionInfoDTO is an interface for free champion rotation data returned from V3 endpoints.
*/

export interface ChampionInfoDTO {
    maxNewPlayerLevel: number;
    freeChampionIdsForNewPlayers: number[];
    freeChampionIds: number[];
}

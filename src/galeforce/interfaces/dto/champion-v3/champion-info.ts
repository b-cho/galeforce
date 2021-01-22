/*
    The ChampionInfoInterface is an interface for free champion rotation data returned from V3 endpoints.
*/

export interface ChampionInfoInterface {
    maxNewPlayerLevel: number;
    freeChampionIdsForNewPlayers: number[];
    freeChampionIds: number[];
}

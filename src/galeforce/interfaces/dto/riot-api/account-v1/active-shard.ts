/*
    The ActiveShardDTO is an interface for account data returned from V1 endpoints.
*/

export interface ActiveShardDTO {
    puuid: string;
    game: string;
    activeShard: string;
}

/*
    The ActiveShardInterface is an interface for account data returned from V1 endpoints.
*/

export interface ActiveShardInterface {
    puuid: string;
    game: string;
    activeShard: string;
}

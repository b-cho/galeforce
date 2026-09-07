/**
 * The set of games accepted by the `account-v1` **active shard** endpoint
 * (`/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}`).
 *
 * Note that this is disjoint from {@link RegionGame}, which corresponds to the games
 * accepted by the **active region** endpoint.
 */
enum ShardGame {
    VALORANT = 'val',
    LOR = 'lor',
}

/**
 * The set of games accepted by the `account-v1` **active region** endpoint
 * (`/riot/account/v1/region/by-game/{game}/by-puuid/{puuid}`).
 *
 * Note that this is disjoint from {@link ShardGame}, which corresponds to the games
 * accepted by the **active shard** endpoint.
 */
enum RegionGame {
    LEAGUE_OF_LEGENDS = 'lol',
    TFT = 'tft',
}

export { ShardGame, RegionGame };

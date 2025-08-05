enum LeagueQueue {
    RANKED_SOLO = 'RANKED_SOLO_5x5',
    RANKED_FLEX = 'RANKED_FLEX_SR',
    RANKED_TT = 'RANKED_FLEX_TT',
}

enum ValorantQueue {
    COMPETITIVE = 'competitive',
    UNRATED = 'unrated',
    SPIKE_RUSH = 'spikerush',
}

enum TFTQueue {
    TURBO = 'RANKED_TFT_TURBO',
}

type Queue = LeagueQueue | ValorantQueue | TFTQueue;
export { LeagueQueue, ValorantQueue, TFTQueue, Queue };

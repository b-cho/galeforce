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

type Queue = `${LeagueQueue | ValorantQueue}`;
export { LeagueQueue, ValorantQueue, Queue };

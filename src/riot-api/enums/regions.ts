enum LeagueRegion {
    BRAZIL = 'br1',
    EUROPE_NORTHEAST = 'eun1',
    EUROPE_WEST = 'euw1',
    KOREA = 'kr',
    LATIN_AMERICA_NORTH = 'la1',
    LATIN_AMERICA_SOUTH = 'la2',
    NORTH_AMERICA = 'na1',
    OCEANIA = 'oc1',
    RUSSIA = 'ru',
    TURKEY = 'tr1',
    JAPAN = 'jp1',
}

enum RiotRegion {
    AMERICAS = 'americas',
    ASIA = 'asia',
    EUROPE = 'europe',
    SEA = 'sea',
    ESPORTS = 'esports',
}

enum LorRegion {
    AMERICAS = 'americas',
    EUROPE = 'europe',
    SOUTHEAST_ASIA = 'sea',
}

enum ValorantRegion {
    ASIA_PACIFIC = 'ap',
    BRAZIL = 'br',
    EUROPE = 'eu',
    KOREA = 'kr',
    LATIN_AMERICA = 'latam',
    NORTH_AMERICA = 'na',
    PBE = 'pbe1',
    ESPORTS = 'esports',
}

enum DataDragonRegion {
    BRAZIL = 'br',
    EUROPE_NORTHEAST = 'eune',
    EUROPE_WEST = 'euw',
    KOREA = 'kr',
    LATIN_AMERICA_NORTH = 'lan',
    LATIN_AMERICA_SOUTH = 'las',
    NORTH_AMERICA = 'na',
    OCEANIA = 'oce',
    RUSSIA = 'ru',
    TURKEY = 'tr',
    JAPAN = 'jp',
}

type Region = LeagueRegion | RiotRegion | ValorantRegion | DataDragonRegion | LorRegion;

export {
    LeagueRegion, RiotRegion, ValorantRegion, Region, DataDragonRegion, LorRegion,
};

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
}

enum ValorantRegion {
    ASIA_PACIFIC = 'ap',
    BRAZIL = 'br',
    EUROPE = 'eu',
    KR = 'kr',
    LATIN_AMERICA = 'latam',
    NORTH_AMERICA = 'na',
    PBE = 'pbe1',
}

type Region = `${LeagueRegion | RiotRegion | ValorantRegion}`;

export { LeagueRegion, RiotRegion, ValorantRegion, Region };

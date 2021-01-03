/*
    The SummonerInterface is an interface for summoner data returned from V4 endpoints.
*/

export interface SummonerInterface {
    id: string;
    accountId: string;
    puuid: string; // We assert that the puuid element exists and has type string.
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
    server: string;
}

/*
    The MatchInterface is an interface for match data returned from V4 endpoints.
*/

export interface MatchInterface {
    gameId: number;
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participantIdentities: object[];
    participants: object[];
    platformId: string;
    queueId: string;
    seasonId: string;
    teams: object[];
}

/*
    The TimelineInterface is an interface for timeline data returned from V4 endpoints.
*/

export interface MatchPositionInterface {
    x: number;
    y: number;
}

export enum MatchEventType {
    CHAMPION_KILL = 'CHAMPION_KILL',
    WARD_PLACED = 'WARD_PLACED',
    WARD_KILL = 'WARD_KILL',
    BUILDING_KILL = 'BUILDING_KILL',
    ELITE_MONSTER_KILL = 'ELITE_MONSTER_KILL',
    ITEM_PURCHASED = 'ITEM_PURCHASED',
    ITEM_SOLD = 'ITEM_SOLD',
    ITEM_DESTROYED = 'ITEM_DESTROYED',
    ITEM_UNDO = 'ITEM_UNDO',
    SKILL_LEVEL_UP = 'SKILL_LEVEL_UP',
    ASCENDED_EVENT = 'ASCENDED_EVENT',
    CAPTURE_POINT = 'CAPTURE_POINT',
    PORO_KING_SUMMON = 'PORO_KING_SUMMON',
}

export interface MatchEventInterface {
    laneType: string;
    skillSlot: number;
    ascendedType: string;
    creatorId: number;
    afterId: number;
    eventType: string;
    type: MatchEventType;
    levelUpType: string;
    wardType: string;
    participantId: number;
    towerType: string;
    itemId: number;
    beforeId: number;
    pointCaptured: string;
    monsterType: string;
    monsterSubType: string;
    teamId: number;
    position: MatchPositionInterface;
    killerId: number;
    timestamp: number;
    assistingParticipants: number[];
    buildingType: string;
    victimId: number;
}

export interface MatchParticipantFrameInterface {
    participantId: number;
    minionsKilled: number;
    teamScore: number;
    dominionScore: number;
    totalGold: number;
    level: number;
    xp: number;
    currentGold: number;
    position: MatchPositionInterface;
    jungleMinionsKilled: number;
}

export interface MatchFrameInterface {
    participantFrames: { [key: string]: MatchParticipantFrameInterface };
    events: MatchEventInterface[];
    timestamp: number;
}

export interface MatchTimelineInterface {
    frames: MatchFrameInterface;
    frameInterval: number;
}

/*
    The MatchlistInterface is an interface for matchlist data returned from V4 endpoints.
*/

export interface MatchReferenceInterface {
    platformId: string;
    gameId: number;
    champion: number;
    queue: number;
    season: number;
    timestamp: number;
    role: string;
    lane: string;
}

export interface MatchlistInterface {
    matches: MatchReferenceInterface[];
    startIndex: number;
    endIndex: number;
    totalGames: number;
}

/*
    The LeagueInterface is an interface for league data returned from V4 endpoints.
*/

export interface MiniSeriesDTOInterface {
    losses: number;
    progress: string;
    target: number;
    wins: number;
}

export interface LeagueEntryInterface {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
    miniSeries: MiniSeriesDTOInterface;
}

/*
    The MasteryInterface is an interface for mastery data returned from V4 endpoints.
*/

export interface ChampionMasteryInterface { // Use as list
    championId: number;
    championLevel: number;
    championPoints: number;
    lastPlayTime: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    tokensEarned: number;
    summonerId: string;
}

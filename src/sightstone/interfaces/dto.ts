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
}

/*
    The MatchInterface is an interface for match data returned from V4 endpoints.
*/

export enum Tier {
    CHALLENGER = 'CHALLENGER', 
    MASTER = 'MASTER',
    DIAMOND = 'DIAMOND',
    PLATINUM = 'PLATINUM',
    GOLD = 'GOLD',
    SILVER = 'SILVER',
    BRONZE = 'BRONZE',
    UNRANKED = 'UNRANKED',
};

export enum Team {
    BLUE = 100,
    RED = 200,
};

export enum MatchResult {
    WIN = 'Win',
    LOSS = 'Fail',
};

export enum Role {
    DUO = 'DUO',
    NONE = 'NONE',
    SOLO = 'SOLO',
    DUO_CARRY = 'DUO_CARRY',
    DUO_SUPPORT = 'DUO_SUPPORT',
};

export enum Lane {
    MID = 'MID', // legacy/deprecated
    MIDDLE = 'MIDDLE',
    TOP = 'TOP',
    JUNGLE = 'JUNGLE',
    BOT = 'BOT', // legacy/deprecated
    BOTTOM = 'BOTTOM'
}

export interface PlayerInterface {
    profileIcon: number;
    accountId: string;
    matchHistoryUri: string;
    currentAccountId: string;
    currentPlatformId: string;
    summonerName: string;
    summonerId: string;
    platformId: string;
}

export interface ParticipantIdentityInterface {
    participantId: number;
    player?: PlayerInterface;
}

export interface TeamBansInterface {
    championId: number;
    pickTurn: number;
}

export interface TeamStatsInterface {
    towerKills: number;
    riftHeraldKills: number;
    firstBlood: boolean;
    inhibitorKills: number;
    bans: TeamBansInterface[];
    firstBaron: boolean;
    firstDragon: boolean;
    dominionVictoryScore: number;
    dragonKills: number;
    baronKills: number;
    firstInhibitor: boolean;
    firstTower: boolean;
    vilemawKills: number;
    firstRiftHerald: boolean;
    teamId: Team; // number, but only two legal values
    win: MatchResult; // string, but only two legal values
}

export interface RuneInterface {
    runeId: number;
    rank: number;
}

export interface ParticipantStatsInterface {
    item0: number;
    item2: number;
    totalUnitsHealed: number;
    item1: number;
    largestMultiKill: number;
    goldEarned: number;
    firstInhibitorKill: boolean;
    physicalDamageTaken: number;
    nodeNeutralizeAssist?: number;
    totalPlayerScore: number;
    champLevel: number;
    damageDealtToObjectives: number;
    totalDamageTaken: number;
    neutralMinionsKilled: number;
    deaths: number;
    tripleKills: number;
    magicDamageDealtToChampions: number;
    wardsKilled: number;
    pentaKills: number;
    damageSelfMitigated: number;
    largestCriticalStrike: number;
    nodeNeutralize?: number;
    totalTimeCrowdControlDealt: number;
    firstTowerKill: boolean;
    magicDamageDealt: number;
    totalScoreRank: number;
    nodeCapture?: number;
    wardsPlaced: number;
    totalDamageDealt: number;
    timeCCingOthers: number;
    magicalDamageTaken: number;
    largestKillingSpree: number;
    totalDamageDealtToChampions: number;
    physicalDamageDealtToChampions: number;
    neutralMinionsKilledTeamJungle: number;
    totalMinionsKilled: number;
    firstInhibitorAssist: boolean;
    visionWardsBoughtInGame: number;
    objectivePlayerScore: number;
    kills: number;
    firstTowerAssist: boolean;
    combatPlayerScore: number;
    inhibitorKills: number;
    turretKills: number;
    participantId: number;
    trueDamageTaken: number;
    firstBloodAssist: boolean;
    nodeCaptureAssist?: number;
    assists: number;
    teamObjective?: number;
    altarsNeutralized?: number;
    goldSpent: number;
    damageDealtToTurrets: number;
    altarsCaptured?: number;
    win: boolean;
    totalHeal: number;
    unrealKills: number;
    visionScore: number;
    physicalDamageDealt: number;
    firstBloodKill: boolean;
    longestTimeSpentLiving: number;
    killingSprees: number;
    sightWardsBoughtInGame: number;
    trueDamageDealtToChampions: number;
    neutralMinionsKilledEnemyJungle: number;
    doubleKills: number;
    trueDamageDealt: number;
    quadraKills: number;
    item4: number;
    item3: number;
    item6: number;
    item5: number;
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    perk0: number;
    perk0Var1: number;
    perk0Var2: number;
    perk0Var3: number;
    perk1: number;
    perk1Var1: number;
    perk1Var2: number;
    perk1Var3: number;
    perk2: number;
    perk2Var1: number;
    perk2Var2: number;
    perk2Var3: number;
    perk3: number;
    perk3Var1: number;
    perk3Var2: number;
    perk3Var3: number;
    perk4: number;
    perk4Var1: number;
    perk4Var2: number;
    perk4Var3: number;
    perk5: number;
    perk5Var1: number;
    perk5Var2: number;
    perk5Var3: number;
    perkPrimaryStyle: number;
    perkSubStyle: number;
    statPerk0: number;
    statPerk1: number;
    statPerk2: number;
}

export interface ParticipantTimelineInterface {
    participantId: number;
    csDiffPerMinDeltas: Record<string, number>;
    damageTakenPerMinDeltas: Record<string, number>;
    role: Role;
    damageTakenDiffPerMinDeltas: Record<string, number>;
    xpPerMinDeltas: Record<string, number>;
    xpDiffPerMinDeltas: Record<string, number>;
    lane: Lane;
    creepsPerMinDeltas: Record<string, number>;
    goldPerMinDeltas: Record<string, number>;
}

export interface MasteryInterface {
    rank: number;
    masteryId: number;
}

export interface ParticipantInterface {
    participantId: number;
    championId: number;
    runes?: RuneInterface[];
    stats: ParticipantStatsInterface;
    teamId: Team; // number, but only two legal values
    timeline: ParticipantTimelineInterface;
    spell1Id: number;
    spell2Id: number;
    highestAchievedSeasonTier?: Tier;
    masteries?: MasteryInterface;
}

export interface MatchInterface {
    gameId: number;
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participantIdentities: ParticipantIdentityInterface[];
    participants: ParticipantInterface[];
    platformId: string;
    queueId: number;
    seasonId: number;
    teams: TeamStatsInterface[];
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
    laneType?: string;
    skillSlot?: number;
    ascendedType?: string;
    creatorId?: number;
    afterId?: number;
    eventType?: string;
    type: MatchEventType;
    levelUpType?: string;
    wardType?: string;
    participantId?: number;
    towerType?: string;
    itemId?: number;
    beforeId?: number;
    pointCaptured?: string;
    monsterType?: string;
    monsterSubType?: string;
    teamId?: number;
    position?: MatchPositionInterface;
    killerId?: number;
    timestamp: number;
    assistingParticipants?: number[];
    buildingType?: string;
    victimId?: number;
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
    participantFrames: Record<string, MatchParticipantFrameInterface>;
    events: MatchEventInterface[];
    timestamp: number;
}

export interface MatchTimelineInterface {
    frames: MatchFrameInterface[];
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
    The LeagueEntryInterface is an interface for league data returned from V4 endpoints.
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
    miniSeries?: MiniSeriesDTOInterface;
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

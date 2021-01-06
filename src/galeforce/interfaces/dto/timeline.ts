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

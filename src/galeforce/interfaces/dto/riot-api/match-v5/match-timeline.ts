interface Metadata {
    dataVersion: string;
    matchId: string;
    participants: string[];
}

interface Position {
    x: number;
    y: number;
}

interface VictimDamageDealt {
    basic: boolean;
    magicDamage: number;
    name: string;
    participantId: number;
    physicalDamage: number;
    spellName: string;
    spellSlot: number;
    trueDamage: number;
    type: string;
}

interface VictimDamageReceived {
    basic: boolean;
    magicDamage: number;
    name: string;
    participantId: number;
    physicalDamage: number;
    spellName: string;
    spellSlot: number;
    trueDamage: number;
    type: string;
}

interface Event {
    realTimestamp?: any;
    timestamp: number;
    type: string;
    itemId?: number;
    participantId?: number;
    afterId?: number;
    beforeId?: number;
    goldGain?: number;
    levelUpType?: string;
    skillSlot?: number;
    creatorId?: number;
    wardType?: string;
    level?: number;
    assistingParticipantIds?: number[];
    bounty?: number;
    killStreakLength?: number;
    killerId?: number;
    position?: Position;
    victimDamageDealt?: VictimDamageDealt[];
    victimDamageReceived?: VictimDamageReceived[];
    victimId?: number;
    killType?: string;
    laneType?: string;
    teamId?: number;
    killerTeamId?: number;
    monsterSubType?: string;
    monsterType?: string;
    multiKillLength?: number;
    buildingType?: string;
    towerType?: string;
    gameId?: number;
    winningTeam?: number;
}

interface ChampionStats {
    abilityHaste: number;
    abilityPower: number;
    armor: number;
    armorPen: number;
    armorPenPercent: number;
    attackDamage: number;
    attackSpeed: number;
    bonusArmorPenPercent: number;
    bonusMagicPenPercent: number;
    ccReduction: number;
    cooldownReduction: number;
    health: number;
    healthMax: number;
    healthRegen: number;
    lifesteal: number;
    magicPen: number;
    magicPenPercent: number;
    magicResist: number;
    movementSpeed: number;
    omnivamp: number;
    physicalVamp: number;
    power: number;
    powerMax: number;
    powerRegen: number;
    spellVamp: number;
}

interface DamageStats {
    magicDamageDone: number;
    magicDamageDoneToChampions: number;
    magicDamageTaken: number;
    physicalDamageDone: number;
    physicalDamageDoneToChampions: number;
    physicalDamageTaken: number;
    totalDamageDone: number;
    totalDamageDoneToChampions: number;
    totalDamageTaken: number;
    trueDamageDone: number;
    trueDamageDoneToChampions: number;
    trueDamageTaken: number;
}

interface ParticipantFrame {
    championStats: ChampionStats;
    currentGold: number;
    damageStats: DamageStats;
    goldPerSecond: number;
    jungleMinionsKilled: number;
    level: number;
    minionsKilled: number;
    participantId: number;
    position: Position;
    timeEnemySpentControlled: number;
    totalGold: number;
    xp: number;
}

interface Frame {
    events: Event[];
    participantFrames: {
        [key: string]: ParticipantFrame;
    };
    timestamp: number;
}

interface Participant {
    participantId: number;
    puuid: string;
}

interface Info {
    frameInterval: number;
    frames: Frame[];
    gameId: number;
    participants: Participant[];
}

export interface MatchTimelineDTO {
    metadata: Metadata;
    info: Info;
}

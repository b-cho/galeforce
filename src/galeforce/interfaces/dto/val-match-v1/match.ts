interface MatchInfoInterface {
    matchId: string;
    mapId: string;
    gameLengthMillis: number;
    gameStartMillis: number;
    provisioningFlowId: string;
    isCompleted: boolean;
    customGameName: string;
    queueId: string;
    gameMode: string;
    isRanked: boolean;
    seasonId: string;
}

interface AbilityCastsInterface {
    grenadeCasts: number;
    ability1Casts: number;
    ability2Casts: number;
    ultimateCasts: number;
}

interface PlayerStatsInterface {
    score: number;
    roundsPlayed: number;
    kills: number;
    deaths: number;
    assists: number;
    playtimeMillis: number;
    abilityCasts: AbilityCastsInterface;
}

interface PlayerInterface {
    puuid: string;
    gameName: string;
    tagLine: string;
    teamId: string;
    partyId: string;
    characterId: string;
    stats: PlayerStatsInterface;
    competitiveTier: number;
    playerCard: string;
    playerTitle: string;
}

interface TeamInterface {
    teamId: string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
}

interface LocationInterface {
    x: number;
    y: number;
}

interface PlayerLocationsInterface {
    puuid: string;
    viewRadians: number;
    location: LocationInterface;
}

interface FinishingDamageInterface {
    damageType: string;
    damageItem: string;
    isSecondaryFireMode: boolean;
}

interface KillInterface {
    timeSinceGameStartMillis: number;
    timeSinceRoundStartMillis: number;
    killer: string;
    victim: string;
    victimLocation: LocationInterface;
    assistants: string[];
    playerLocations: PlayerLocationsInterface[];
    finishingDamage: FinishingDamageInterface;
}

interface DamageInterface {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}

interface EconomyInterface {
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}

interface AbilityInterface {
    grenadeEffects: string;
    ability1Effects: string;
    ability2Effects: string;
    ultimateEffects: string;
}

interface PlayerRoundStatsInterface {
    puuid: string;
    kills: KillInterface[];
    damage: DamageInterface[];
    score: number;
    economy: EconomyInterface;
    ability: AbilityInterface;
}

interface RoundResultInterface {
    roundNum: number;
    roundResult: string;
    roundCeremony: string;
    winningTeam: string;
    bombPlanter: string;
    bombDefuser: string;
    plantRoundTime: number;
    plantPlayerLocations: PlayerLocationsInterface[];
    plantLocation: LocationInterface;
    plantSite: string;
    defuseRoundTime: number;
    defusePlayerLocations: PlayerLocationsInterface[];
    defuseLocation: LocationInterface;
    playerStats: PlayerRoundStatsInterface;
    roundResultCode: string;
}

export interface ValMatchInterface {
    matchInfo: MatchInfoInterface;
    players: PlayerInterface[];
    teams: TeamInterface[];
    roundResults: RoundResultInterface[];
}
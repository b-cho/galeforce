interface MatchInfoDTO {
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

interface AbilityCastsDTO {
    grenadeCasts: number;
    ability1Casts: number;
    ability2Casts: number;
    ultimateCasts: number;
}

interface PlayerStatsDTO {
    score: number;
    roundsPlayed: number;
    kills: number;
    deaths: number;
    assists: number;
    playtimeMillis: number;
    abilityCasts: AbilityCastsDTO;
}

interface PlayerDTO {
    puuid: string;
    gameName: string;
    tagLine: string;
    teamId: string;
    partyId: string;
    characterId: string;
    stats: PlayerStatsDTO;
    competitiveTier: number;
    playerCard: string;
    playerTitle: string;
}

interface TeamDTO {
    teamId: string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
}

interface LocationDTO {
    x: number;
    y: number;
}

interface PlayerLocationsDTO {
    puuid: string;
    viewRadians: number;
    location: LocationDTO;
}

interface FinishingDamageDTO {
    damageType: string;
    damageItem: string;
    isSecondaryFireMode: boolean;
}

interface KillDTO {
    timeSinceGameStartMillis: number;
    timeSinceRoundStartMillis: number;
    killer: string;
    victim: string;
    victimLocation: LocationDTO;
    assistants: string[];
    playerLocations: PlayerLocationsDTO[];
    finishingDamage: FinishingDamageDTO;
}

interface DamageDTO {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}

interface EconomyDTO {
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}

interface AbilityDTO {
    grenadeEffects: string | null;
    ability1Effects: string | null;
    ability2Effects: string | null;
    ultimateEffects: string | null;
}

interface PlayerRoundStatsDTO {
    puuid: string;
    kills: KillDTO[];
    damage: DamageDTO[];
    score: number;
    economy: EconomyDTO;
    ability: AbilityDTO;
}

interface RoundResultDTO {
    roundNum: number;
    roundResult: string;
    roundCeremony: string;
    winningTeam: string;
    bombPlanter: string | null;
    bombDefuser: string | null;
    plantRoundTime: number;
    plantPlayerLocations: PlayerLocationsDTO[] | null;
    plantLocation: LocationDTO;
    plantSite: string;
    defuseRoundTime: number;
    defusePlayerLocations: PlayerLocationsDTO[] | null;
    defuseLocation: LocationDTO;
    playerStats: PlayerRoundStatsDTO[];
    roundResultCode: string;
}

export interface ValMatchDTO {
    matchInfo: MatchInfoDTO;
    players: PlayerDTO[];
    teams: TeamDTO[];
    roundResults: RoundResultDTO[];
}

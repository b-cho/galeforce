/*
    The ChampionMasteryInterface is an interface for mastery data returned from V4 endpoints.
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

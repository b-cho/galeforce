/*
    The ChampionMasteryDTO is an interface for mastery data returned from V4 endpoints.
*/

interface RewardConfigDTO {
    rewardValue: string;
    rewardType: string;
    maximumReward: number;
}

interface NextSeasonMilestonesDTO {
    requireGradeCounts: { [key: string]: number };
    rewardMarks: number;
    bonus: boolean;
    totalGamesRequires?: number;
    rewardConfig?: RewardConfigDTO;
}

export interface ChampionMasteryDTO { // Use as list
    puuid: string;
    championId: number;
    championLevel: number;
    championPoints: number;
    lastPlayTime: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    markRequiredForNextLevel: number;
    championSeasonMilestone: number;
    nextSeasonMilestone: NextSeasonMilestonesDTO;
    tokensEarned: number;
    milestoneGrades?: string[];
    /**
     * Note that champion chests were removed from League of Legends, so this field is
     * no longer returned by the API. It is retained as optional for backwards compatibility.
     */
    chestGranted?: boolean;
}

interface ChallengeInfo {
    challengeId: number;
    percentile: number;
    level: string;
    value: number;
    achievedTime: number;
}

interface PlayerClientPreferences {
    bannerAccent: string;
    title: string;
    challengeIds: number[];
}

interface ChallengePoints {
    level: string;
    current: number;
    max: number;
    percentile: number;
}

export interface PlayerInfoDTO {
    challenges: ChallengeInfo[];
    preferences: PlayerClientPreferences;
    totalPoints: ChallengePoints;
    categoryPoints: {
        [key: string]: ChallengePoints;
    };
}

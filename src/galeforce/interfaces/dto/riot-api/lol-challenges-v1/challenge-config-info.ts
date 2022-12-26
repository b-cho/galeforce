enum State {
    DISABLED = 'DISABLED',
    HIDDEN = 'HIDDEN',
    ENABLED = 'ENABLED',
    ARCHIVED = 'ARCHIVED',
}

enum Tracking {
    LIFETIME = 'LIFETIME',
    SEASON = 'SEASON',
}

interface NameDescription {
    description: string;
    name: string;
    shortDescription: string;
}

export interface ChallengeConfigInfoDTO {
    id: number;
    localizedNames: {
        [key: string]: NameDescription;
    };
    state: State;
    tracking: Tracking;
    startTimestamp: number;
    endTimestamp: number;
    leaderboard: boolean;
    thresholds: {
        [key: string]: number;
    };
}
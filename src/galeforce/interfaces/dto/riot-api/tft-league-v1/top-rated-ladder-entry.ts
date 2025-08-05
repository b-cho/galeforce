export interface TopRatedLadderEntryDTO {
    puuid: string;
    ratedTier: 'ORANGE' | 'PURPLE' | 'BLUE' | 'GREEN' | 'GRAY';
    ratedRating: number;
    wins: number;
    previousUpdateLadderPosition: number;
}
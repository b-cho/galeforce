type Level = 'NONE' | 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER';

export type PercentilesDTO = {
    [key in Level]: number;
}
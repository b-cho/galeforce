/* eslint-disable camelcase */

enum GameMode {
    Constructed = 'Constructed',
    Expeditions = 'Expeditions',
    Tutorial = 'Tutorial',
}

enum GameType {
    Ranked = 'Ranked',
    Normal = 'Normal',
    AI = 'AI',
    Tutorial = 'Tutorial',
    VanillaTrial = 'VanillaTrial',
    Singleton = 'Singleton',
    StandardGauntlet = 'StandardGauntlet',
}

interface PlayerDTO {
    puuid: string;
    deck_id: string;
    deck_code: string;
    factions: string[];
    game_outcome: string;
    order_of_play: number;
}

interface InfoDTO {
    game_mode: GameMode; // (Legal values: Constructed, Expeditions, Tutorial)
    game_type: GameType; // (Legal values: Ranked, Normal, AI, Tutorial, VanillaTrial, Singleton, StandardGauntlet)
    game_start_time_utc: string;
    game_version: string;
    players: PlayerDTO[];
    total_turn_count: number;
}

interface MetadataDTO {
    data_version: string;
    match_id: string;
    participants: string[];
}

export interface LorMatchDTO {
    metadata: MetadataDTO;
    info: InfoDTO;
}
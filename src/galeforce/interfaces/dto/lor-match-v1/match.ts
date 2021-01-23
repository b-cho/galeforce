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

interface PlayerInterface {
    puuid: string;
    deck_id: string;
    deck_code: string;
    factions: string[];
    game_outcome: string;
    order_of_play: number;
}

interface InfoInterface {
    game_mode: GameMode; // (Legal values: Constructed, Expeditions, Tutorial)
    game_type: GameType; // (Legal values: Ranked, Normal, AI, Tutorial, VanillaTrial, Singleton, StandardGauntlet)
    game_start_time_utc: string;
    game_version: string;
    players: PlayerInterface[];
    total_turn_count: number;
}

interface MetadataInterface {
    data_version: string;
    match_id: string;
    participants: string[];
}

export interface LorMatchInterface {
    metadata: MetadataInterface;
    info: InfoInterface;
}

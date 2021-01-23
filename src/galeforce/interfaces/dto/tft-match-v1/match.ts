interface MetadataInterface {
    data_version: string;
    match_id: string;
    participants: string[];
}

interface CompanionInterface {

}

type StyleType = 0 | 1 | 2 | 3 | 4;

interface TraitInterface {
    name: string;
    num_units: number;
    style: StyleType;
    tier_current: number;
    tier_total: number;
}

interface UnitInterface {
    items: number[];
    character_id: string;
    chosen?: string;
    name: string;
    rarity: number;
    tier: number;
}

interface ParticipantInterface {
    companion: CompanionInterface;
    gold_left: number;
    last_round: number;
    level: number;
    placement: number;
    players_eliminated: number;
    puuid: string;
    time_eliminated: number;
    total_damage_to_players: number;
    traits: TraitInterface[];
    units: UnitInterface[];
}

interface InfoInterface {
    game_datetime: number;
    game_length: number;
    game_variation?: string;
    game_version: string;
    participants: ParticipantInterface[];
    queue_id: number;
    tft_set_number: number;
}

export interface TFTMatchInterface {
    metadata: MetadataInterface;
    info: InfoInterface;
}
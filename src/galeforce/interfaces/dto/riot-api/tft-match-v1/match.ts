/* eslint-disable camelcase */

interface MetadataDTO {
    data_version: string;
    match_id: string;
    participants: string[];
}

interface CompanionDTO {

}

type StyleType = 0 | 1 | 2 | 3 | 4;

interface TraitDTO {
    name: string;
    num_units: number;
    style: StyleType;
    tier_current: number;
    tier_total: number;
}

interface UnitDTO {
    items: number[];
    character_id: string;
    chosen?: string;
    name: string;
    rarity: number;
    tier: number;
}

interface ParticipantDTO {
    companion: CompanionDTO;
    gold_left: number;
    last_round: number;
    level: number;
    placement: number;
    players_eliminated: number;
    puuid: string;
    time_eliminated: number;
    total_damage_to_players: number;
    traits: TraitDTO[];
    units: UnitDTO[];
}

interface InfoDTO {
    game_datetime: number;
    game_length: number;
    game_variation?: string;
    game_version: string;
    participants: ParticipantDTO[];
    queue_id: number;
    tft_set_number: number;
}

export interface TFTMatchDTO {
    metadata: MetadataDTO;
    info: InfoDTO;
}

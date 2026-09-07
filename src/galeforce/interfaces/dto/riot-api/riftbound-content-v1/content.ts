interface CardStatsDTO {
    energy: number;
    might: number;
    cost: number;
    power: number;
}

interface CardArtDTO {
    thumbnailURL: string;
    fullURL: string;
    artist: string;
}

interface CardDTO {
    id: string;
    collectorNumber: number;
    set: string;
    name: string;
    description: string;
    type: string;
    rarity: string;
    faction: string;
    stats: CardStatsDTO;
    keywords: string[];
    art: CardArtDTO;
    flavorText: string;
    tags: string[];
}

interface SetDTO {
    id: string;
    name: string;
    cards: CardDTO[];
}

export interface RiftboundContentDTO {
    game: string;
    version: string;
    lastUpdated: string;
    sets: SetDTO[];
}

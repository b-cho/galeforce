interface LocalizedNamesDTO {
    'ar-AE': string;
    'de-DE': string;
    'en-GB': string;
    'en-US': string;
    'es-ES': string;
    'es-MX': string;
    'fr-FR': string;
    'id-ID': string;
    'it-IT': string;
    'ja-JP': string;
    'ko-KR': string;
    'pl-PL': string;
    'pt-BR': string;
    'ru-RU': string;
    'th-TH': string;
    'tr-TR': string;
    'vi-VN': string;
    'zh-CN': string;
    'zh-TW': string;
}

interface ContentItemDTO {
    name: string;
    localizedNames?: LocalizedNamesDTO;
    id: string;
    assetName: string;
    assetPath?: string;
}

interface ActDTO {
    name: string;
    localizedNames?: LocalizedNamesDTO;
    id: string;
    isActive: boolean;
}

export interface ValContentDTO {
    version: string;
    characters: ContentItemDTO[];
    maps: ContentItemDTO[];
    chromas: ContentItemDTO[];
    skins: ContentItemDTO[];
    skinLevels: ContentItemDTO[];
    equips: ContentItemDTO[];
    gameModes: ContentItemDTO[];
    sprays: ContentItemDTO[];
    sprayLevels: ContentItemDTO[];
    charms: ContentItemDTO[];
    charmLevels: ContentItemDTO[];
    playerCards: ContentItemDTO[];
    playerTitles: ContentItemDTO[];
    acts: ActDTO[];
}

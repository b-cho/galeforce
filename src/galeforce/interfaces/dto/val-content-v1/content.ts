interface LocalizedNamesInterface {
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

interface ContentItemInterface {
    name: string;
    localizedNames?: LocalizedNamesInterface;
    id: string;
    assetName: string;
    assetPath?: string;
}

interface ActInterface {
    name: string;
    localizedNames?: LocalizedNamesInterface;
    id: string;
    isActive: boolean;
}

export interface ValContentInterface {
    version: string;
    characters: ContentItemInterface[];
    maps: ContentItemInterface[];
    chromas: ContentItemInterface[];
    skins: ContentItemInterface[];
    skinLevels: ContentItemInterface[];
    equips: ContentItemInterface[];
    gameModes: ContentItemInterface[];
    sprays: ContentItemInterface[];
    sprayLevels: ContentItemInterface[];
    charms: ContentItemInterface[];
    charmLevels: ContentItemInterface[];
    playerCards: ContentItemInterface[];
    playerTitles: ContentItemInterface[];
    acts: ActInterface[];
}

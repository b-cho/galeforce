interface VocabTerm {
    description: string;
    name: string;
    nameRef: string;
}

interface Keyword {
    description: string;
    name: string;
    nameRef: string;
}

interface Region {
    abbreviation: string;
    iconAbsolutePath: string;
    name: string;
    nameRef: string;
}

interface SpellSpeed {
    name: string;
    nameRef: string;
}

interface Rarity {
    name: string;
    nameRef: string;
}

interface Set {
    iconAbsolutePath: string;
    name: string;
    nameRef: string;
}

export interface LorDataDragonGlobalsDTO {
    vocabTerms: VocabTerm[];
    keywords: Keyword[];
    regions: Region[];
    spellSpeeds: SpellSpeed[];
    rarities: Rarity[];
    sets: Set[];
}

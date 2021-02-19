interface GeneralRune {
    displayName: string;
    id: number;
    rawDescription: string;
    rawDisplayName: string;
}

interface StatRune {
    id: number;
    rawDescription: string;
}

export interface LiveClientFullRunesDTO {
    keystone: GeneralRune;
    primaryRuneTree: GeneralRune;
    secondaryRuneTree: GeneralRune;
    generalRunes: GeneralRune[];
    statRunes: StatRune[];
}

export interface LiveClientMainRunesDTO {
    keystone: GeneralRune;
    primaryRuneTree: GeneralRune;
    secondaryRuneTree: GeneralRune;
}
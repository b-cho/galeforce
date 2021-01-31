interface N {
    item: string;
    rune: string;
    mastery: string;
    summoner: string;
    champion: string;
    profileicon: string;
    map: string;
    language: string;
    sticker: string;
}

export interface DataDragonRegionDTO {
    n: N;
    v: string;
    l: string;
    cdn: string;
    dd: string;
    lg: string;
    css: string;
    profileiconmax: number;
    store?: any;
}

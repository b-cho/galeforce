interface InfoDTO {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
}

interface ImageDTO {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface StatsDTO {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
}

interface DataDTO {
    [key: string]: {
        version: string;
        id: string;
        key: string;
        name: string;
        title: string;
        blurb: string;
        info: InfoDTO;
        image: ImageDTO;
        tags: string[];
        partype: string;
        stats: StatsDTO;
    };
}

export interface DataDragonChampionListDTO {
    type: string;
    format: string;
    version: string;
    data: DataDTO;
}

interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Skin {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
}

interface Info {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
}

interface Stats {
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

interface LevelTip {
    label: string[];
    effect: string[];
}

interface DataValues {

}

type Effect = number[] | null;

type EffectBurn = string | null;

interface Spell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    leveltip: LevelTip;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: DataValues;
    effect: Effect[];
    effectBurn: EffectBurn[];
    vars: any[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image;
    resource: string;
}

interface Passive {
    name: string;
    description: string;
    image: Image;
}

interface Item {
    id: string;
    count: number;
    hideCount: boolean;
}

interface Block {
    type: string;
    recMath: boolean;
    recSteps: boolean;
    minSummonerLevel: number;
    maxSummonerLevel: number;
    showIfSummonerSpell: string;
    hideIfSummonerSpell: string;
    appendAfterSection?: string;
    visibleWithAllOf?: string[];
    hiddenWithAnyOf?: string[];
    items: Item[];
}

interface Recommended {
    champion: string;
    title: string;
    map: string;
    mode: string;
    type: string;
    customTag: string;
    sortrank: number;
    extensionPage: boolean;
    useObviousCheckmark?: boolean;
    customPanel?: any;
    blocks: Block[];
}

interface Champion {
    id: string;
    key: string;
    name: string;
    title: string;
    image: Image;
    skins: Skin[];
    lore: string;
    blurb: string;
    allytips: string[];
    enemytips: string[];
    tags: string[];
    partype: string;
    info: Info;
    stats: Stats;
    spells: Spell[];
    passive: Passive;
    recommended: Recommended[];
}

interface Data {
    [key: string]: Champion;
}

export interface DataDragonChampionDTO {
    type: string;
    format: string;
    version: string;
    data: Data;
}

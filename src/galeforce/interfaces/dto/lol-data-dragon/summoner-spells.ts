interface DataValues {

}

interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

type Coeff = number[] | number;

interface Vars {
    link: string;
    coeff: Coeff;
    key: string;
}

type Effect = number[] | null;

type EffectBurn = string | null;

interface Data {
    [key: string]: {
        id: string;
        name: string;
        description: string;
        tooltip: string;
        maxrank: number;
        cooldown: number[];
        cooldownBurn: string;
        cost: number[];
        costBurn: string;
        datavalues: DataValues;
        effect: Effect[];
        effectBurn: EffectBurn[];
        vars: Vars[];
        key: string;
        summonerLevel: number;
        modes: string[];
        costType: string;
        maxammo: string;
        range: number[];
        rangeBurn: string;
        image: Image;
        resource: string;
    };
}

export interface DataDragonSummonerSpellListDTO {
    type: string;
    version: string;
    data: Data;
}

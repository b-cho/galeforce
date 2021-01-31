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
        vars: any[];
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

export interface DataDragonSummonerListDTO {
    type: string;
    version: string;
    data: Data;
}

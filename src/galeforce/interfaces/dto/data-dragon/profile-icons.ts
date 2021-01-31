interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
interface Data {
    [key: string]: {
        id: number;
        image: Image;
    };
}

export interface DataDragonProfileIconListDTO {
    type: string;
    version: string;
    data: Data;
}

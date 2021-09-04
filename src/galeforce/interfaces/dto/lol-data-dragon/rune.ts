interface Rune {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}

interface Slot {
    runes: Rune[];
}

export interface DataDragonRuneDTO {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: Slot[];
}

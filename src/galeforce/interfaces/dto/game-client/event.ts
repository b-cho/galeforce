export interface Event {
    EventID: number;
    EventName: string;
    EventTime: number;
    KillerName?: string;
    VictimName?: string;
    TurretKilled?: string;
    Stolen?: string;
    Assisters?: string[];
    DragonType?: string;
    Acer?: string;
    AcingTeam?: string;
}

export interface LiveClientEventsDTO {
    Events: Event[];
}
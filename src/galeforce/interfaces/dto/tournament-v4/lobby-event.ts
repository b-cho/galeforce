interface LobbyEventDTO {
    timestamp: string;
    eventType: string;
    summonerId: string | null;
}

export interface LobbyEventDTOWrapper {
    eventList: LobbyEventDTO[];
}

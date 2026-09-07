interface LobbyEventDTO {
    timestamp: string;
    eventType: string;
    puuid?: string | null;
}

export interface LobbyEventDTOWrapper {
    eventList: LobbyEventDTO[];
}

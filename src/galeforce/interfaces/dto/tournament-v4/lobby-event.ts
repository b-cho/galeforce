interface LobbyEventInterface {
    timestamp: string;
    eventType: string;
    summonerId: string | null;
}

export interface LobbyEventInterfaceWrapper {
    eventList: LobbyEventInterface[];
}

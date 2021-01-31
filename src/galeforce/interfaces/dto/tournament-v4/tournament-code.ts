type TeamSize = 1 | 2 | 3 | 4 | 5;

enum PickType {
    BLIND_PICK = 'BLIND_PICK',
    DRAFT_MODE = 'DRAFT_MODE',
    ALL_RANDOM = 'ALL_RANDOM',
    TOURNAMENT_DRAFT = 'TOURNAMENT_DRAFT',
}

enum MapType {
    SUMMONERS_RIFT = 'SUMMONERS_RIFT',
    TWISTED_TREELINE = 'TWISTED_TREELINE',
    HOWLING_ABYSS = 'HOWLING_ABYSS',
}

enum SpectatorType {
    NONE = 'NONE',
    LOBBYONLY = 'LOBBYONLY',
    ALL = 'ALL',
}

export interface TournamentCodeDTO {
    code: string;
    spectators: string;
    lobbyName: string;
    metaData: string;
    password: string;
    teamSize: TeamSize;
    providerId: number;
    pickType: PickType;
    tournamentId: number;
    id: number;
    region: 'BR' | 'EUNE' | 'EUW' | 'JP' | 'LAN' | 'LAS' | 'NA' | 'OCE' | 'PBE' | 'RU' | 'TR';
    map: string;
    participants: string[];
}

export interface TournamentCodeParameters {
    allowedSummonerIds: string[];
    metadata: string;
    teamSize: TeamSize;
    pickType: PickType;
    mapType: MapType;
    spectatorType: SpectatorType;
}

export interface TournamentCodeUpdateParameters {
    allowedSummonerIds: string[];
    pickType: PickType;
    mapType: MapType;
    spectatorType: SpectatorType;
}

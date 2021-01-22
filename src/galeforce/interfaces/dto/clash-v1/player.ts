/*
    The PlayerInterface is an interface for Clash player data returned from V1 endpoints.
*/

export enum Position {
    UNSELECTED = 'UNSELECTED',
    FILL = 'FILL',
    TOP = 'TOP',
    JUNGLE = 'JUNGLE',
    MIDDLE = 'MIDDLE',
    BOTTOM = 'BOTTOM',
    UTILITY = 'UTILITY',
}

export enum Role {
    CAPTAIN = 'CAPTAIN',
    MEMBER = 'MEMBER',
}

export interface PlayerInterface {
    summonerId: string;
    teamId: string;
    position: Position;
    role: Role;
}

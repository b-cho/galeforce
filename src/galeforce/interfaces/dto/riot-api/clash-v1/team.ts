/*
    The TeamDTO is an interface for Clash team data returned from V1 endpoints.
*/

import { Position, Role } from './player';

interface PlayerDTO {
    summonerId: string;
    position: Position;
    role: Role;
}

export interface TeamDTO {
    id: string;
    tournamentId: number;
    name: string;
    iconId: number;
    tier: number;
    captain: string; // Summoner ID of the team captain.
    abbreviation: string;
    players: PlayerDTO[]; // Team members.
}

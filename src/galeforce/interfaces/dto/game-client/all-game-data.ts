import { LiveClientActivePlayerDTO } from './active-player';
import { LiveClientPlayerDTO } from './all-players';
import { LiveClientEventsDTO } from './event';
import { LiveClientGameStatsDTO } from './game-stats';

export interface LiveClientAllGameDataDTO {
    activePlayer: LiveClientActivePlayerDTO;
    allPlayers: LiveClientPlayerDTO[];
    events: LiveClientEventsDTO;
    gameData: LiveClientGameStatsDTO;
}

import { LiveClientMainRunesDTO } from './runes';
import { LiveClientScoreDTO } from './player-scores';
import { LiveClientSummonerSpellsDTO } from './summoner-spells';
import { LiveClientItemDTO } from './item';

export interface LiveClientPlayerDTO {
    championName: string;
    isBot: boolean;
    isDead: boolean;
    items: LiveClientItemDTO[];
    level: number;
    position: string;
    rawChampionName: string;
    respawnTimer: number;
    runes: LiveClientMainRunesDTO;
    scores: LiveClientScoreDTO;
    skinID: number;
    summonerName: string;
    summonerSpells: LiveClientSummonerSpellsDTO;
    team: string;
}

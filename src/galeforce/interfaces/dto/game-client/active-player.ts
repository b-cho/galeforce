import { LiveClientAbilitiesDTO } from './abilities';
import { LiveClientFullRunesDTO } from './runes';

interface ChampionStats {
    abilityPower: number;
    armor: number;
    armorPenetrationFlat: number;
    armorPenetrationPercent: number;
    attackDamage: number;
    attackRange: number;
    attackSpeed: number;
    bonusArmorPenetrationPercent: number;
    bonusMagicPenetrationPercent: number;
    cooldownReduction: number;
    critChance: number;
    critDamage: number;
    currentHealth: number;
    healthRegenRate: number;
    lifeSteal: number;
    magicLethality: number;
    magicPenetrationFlat: number;
    magicPenetrationPercent: number;
    magicResist: number;
    maxHealth: number;
    moveSpeed: number;
    physicalLethality: number;
    resourceMax: number;
    resourceRegenRate: number;
    resourceType: string;
    resourceValue: number;
    spellVamp: number;
    tenacity: number;
}

export interface LiveClientActivePlayerDTO {
    abilities: LiveClientAbilitiesDTO;
    championStats: ChampionStats;
    currentGold: number;
    fullRunes: LiveClientFullRunesDTO;
    level: number;
    summonerName: string;
}

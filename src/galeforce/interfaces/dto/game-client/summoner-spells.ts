export interface SummonerSpell {
    displayName: string;
    rawDescription: string;
    rawDisplayName: string;
}

export interface LiveClientSummonerSpellsDTO {
    summonerSpellOne: SummonerSpell;
    summonerSpellTwo: SummonerSpell;
}

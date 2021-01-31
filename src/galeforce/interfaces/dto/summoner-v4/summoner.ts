export interface SummonerDTO {
    id: string;
    accountId: string;
    puuid: string; // We assert that the puuid element exists and has type string.
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

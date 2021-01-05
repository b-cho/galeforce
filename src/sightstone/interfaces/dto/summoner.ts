/*
    The SummonerInterface is an interface for summoner data returned from V4 endpoints.
*/

export interface SummonerInterface {
    id: string;
    accountId: string;
    puuid: string; // We assert that the puuid element exists and has type string.
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

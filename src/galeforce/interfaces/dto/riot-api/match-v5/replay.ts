/*
    The ReplayDTO is an interface for match replay data returned from V5 endpoints.
*/

export interface ReplayDTO {
    total: number;
    matchFileURLs: string[];
}

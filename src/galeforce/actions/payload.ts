import { Region, Queue, Tier, Division, Game } from '../../riot-api';

export type Payload = {
    endpoint?: string;
    query?: object;
    body?: object;
    region?: Region;
    summonerId?: string;
    accountId?: string;
    puuid?: string;
    summonerName?: string;
    matchId?: number;
    teamId?: string;
    tournamentId?: number;
    tournamentCode?: string;
    championId?: number;
    leagueId?: string;
    queue?: Queue;
    tier?: Tier;
    division?: Division;
    gameName?: string;
    tagLine?: string;
    game?: string;
}

export class PayloadWrapper {
    public payload: Payload = {};

    constructor(payload?: Payload) {
        if(payload) this.payload = payload;
    }

    public setEndpoint(endpoint: string): void {
        this.payload.endpoint = endpoint;
    }

    public setRegion(region: Region): void {
        // Region check in case types are not followed
        if (!(Object as any).values(Region).includes(region)) {
            throw new Error('[galeforce]: Invalid region provided.');
        }

        this.payload.region = region;
    }

    public setBody(body: object): void {
        this.payload.body = body;
    }

    public setQuery(query: object): void {
        this.payload.query = query;
    }

    public setSummonerId(summonerId: string): void {
        if (summonerId.length > 63) {
            throw new Error('[galeforce]: summonerId is invalid according to Riot specifications (length > 63).');
        }

        this.payload.summonerId = summonerId;
    }

    public setAccountId(accountId: string): void {
        if (accountId.length > 56) {
            throw new Error('[galeforce]: accountId is invalid according to Riot specifications (length > 56).');
        }

        this.payload.accountId = accountId;
    }

    public setPuuid(puuid: string): void {
        if (puuid.length > 78) {
            throw new Error('[galeforce]: puuid is invalid according to Riot specifications (length > 78).');
        }

        this.payload.puuid = puuid;
    }

    public setName(name: string): void {
        this.payload.summonerName = name;
    }

    public setMatchId(matchId: number): void {
        this.payload.matchId = matchId;
    }

    public setTeamId(teamId: string): void {
        this.payload.teamId = teamId;
    }

    public setTournamentId(tournamentId: number): void {
        this.payload.tournamentId = tournamentId;
    }

    public setTournamentCode(tournamentCode: string): void {
        this.payload.tournamentCode = tournamentCode;
    }

    public setChampionId(championId: number): void {
        this.payload.championId = championId;
    }

    public setLeagueId(leagueId: string): void {
        this.payload.leagueId = leagueId;
    }

    public setQueue(queue: Queue): void {
        // Queue check in case types are not followed
        if (!(Object as any).values(Queue).includes(queue)) {
            throw new Error('[galeforce]: Invalid queue type provided.');
        }
        this.payload.queue = queue;
    }

    public setTier(tier: Tier): void {
        // Tier check in case types are not followed
        if (!(Object as any).values(Tier).includes(tier)) {
            throw new Error('[galeforce]: Invalid ranked tier provided.');
        }
        this.payload.tier = tier;
    }

    public setDivision(division: Division): void {
        // Queue check in case types are not followed
        if (!(Object as any).values(Division).includes(division)) {
            throw new Error('[galeforce]: Invalid ranked division provided.');
        }
        this.payload.division = division;
    }

    public setGameName(gameName: string): void {
        this.payload.gameName = gameName;
    }

    public setTagLine(tagLine: string): void {
        this.payload.tagLine = tagLine;
    }

    public setGame(game: Game): void {
        if (!(Object as any).values(Game).includes(game)) {
            throw new Error('[galeforce]: Invalid game provided.');
        }
        this.payload.game = game;
    }
}
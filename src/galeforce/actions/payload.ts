import {
    Region, Queue, Tier, Division, Game,
} from '../../riot-api';

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

export const CreatePayloadProxy = (payload: Payload): Payload => new Proxy(payload, {
    get: <T extends keyof Payload>(target: Payload, name: T): Payload[T] => target[name],
    set: <T extends keyof Payload>(target: Payload, name: T, value: Payload[T]): boolean => {
        if (name === 'region') { // Region check in case types are not followed
            if (!(Object as any).values(Region).includes(value)) {
                throw new Error('[galeforce]: Invalid region provided.');
            }
        } else if (name === 'queue') { // Queue check in case types are not followed
            if (!(Object as any).values(Queue).includes(value)) {
                throw new Error('[galeforce]: Invalid queue type provided.');
            }
        } else if (name === 'tier') { // Tier check in case types are not followed
            if (!(Object as any).values(Tier).includes(value)) {
                throw new Error('[galeforce]: Invalid ranked tier provided.');
            }
        } else if (name === 'division') { // Division check in case types are not followed
            if (!(Object as any).values(Division).includes(value)) {
                throw new Error('[galeforce]: Invalid ranked division provided.');
            }
        } else if (name === 'game') { // Game check in case types are not followed
            if (!(Object as any).values(Game).includes(value)) {
                throw new Error('[galeforce]: Invalid game provided.');
            }
        } else if (['summonerId', 'accountId', 'puuid'].includes(name)) {
            if (typeof value !== 'string') {
                throw new Error(`[galeforce]: ${name} must be a string.`);
            }
            if (name === 'summonerId' && value.length > 63) {
                throw new Error('[galeforce]: summonerId is invalid according to Riot specifications (length > 63).');
            } else if (name === 'accountId' && value.length > 56) {
                throw new Error('[galeforce]: accountId is invalid according to Riot specifications (length > 56).');
            } else if (name === 'puuid' && value.length > 78) {
                throw new Error('[galeforce]: puuid is invalid according to Riot specifications (length > 78).');
            }
        }

        target[name] = value;
        return true;
    },
});

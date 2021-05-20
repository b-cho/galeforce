import debug from 'debug';
import chalk from 'chalk';
import {
    Region, Queue, Tier, Division, Game, DataDragonRegion,
    LeagueRegion, ValorantRegion, RiotRegion, LeagueQueue, ValorantQueue,
} from '../../riot-api';

const payloadDebug = debug('galeforce:payload');

export type Payload = { // Payload keys and corresponding valid types
    readonly _id: string;
    type?: 'lol' | 'val' | 'riot' | 'ddragon' | 'ddragon-buffer' | 'lcu' | 'gc';
    method?: 'GET' | 'POST' | 'PUT';
    endpoint?: string;
    query?: object;
    body?: object;
    region?: Region;
    summonerId?: string;
    accountId?: string;
    puuid?: string;
    summonerName?: string;
    matchId?: number | string;
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
    game?: Game;
    actId?: string;
    version?: string;
    locale?: string;
    champion?: string;
    skin?: number;
    spell?: string;
    assetId?: string | number;
}

export type ModifiablePayload = Omit<Payload, '_id' | 'type' | 'method' | 'endpoint'>;

const payloadKeys: (keyof Payload)[] = [ // List of all valid keys for the payload
    '_id', 'type', 'method', 'endpoint', 'query', 'body',
    'region', 'summonerId', 'accountId', 'puuid', 'summonerName',
    'matchId', 'teamId', 'tournamentId', 'tournamentCode', 'championId',
    'leagueId', 'queue', 'tier', 'division', 'gameName', 'tagLine',
    'game', 'actId', 'version', 'locale', 'champion', 'skin', 'spell',
    'assetId',
];

export const CreatePayloadProxy = (payload: Payload): Payload => new Proxy(payload, {
    get: <T extends keyof Payload>(target: Payload, name: T): Payload[T] => target[name],
    set: <T extends keyof Payload>(target: Payload, name: T, value: Payload[T]): boolean => {
        payloadDebug(`${chalk.bold.magenta(target._id)} | ${chalk.cyan.bold(name)} ${chalk.dim(target[name])} \u279F %O`, value);

        switch (name) { // Handle special value checks for specific properties
        case 'region': { // Region check in case types are not followed
            const isLeagueRegion: boolean = Object.values(LeagueRegion).includes(value as LeagueRegion);
            const isValorantRegion: boolean = Object.values(ValorantRegion).includes(value as ValorantRegion);
            const isRiotRegion: boolean = Object.values(RiotRegion).includes(value as RiotRegion);
            const isDataDragonRegion: boolean = Object.values(DataDragonRegion).includes(value as DataDragonRegion);
            if (target.type === 'lol' && !isLeagueRegion) {
                throw new Error('[galeforce]: Invalid /lol region provided.');
            } else if (target.type === 'val' && !isValorantRegion) {
                throw new Error('[galeforce]: Invalid /val region provided.');
            } else if (target.type === 'riot' && !isRiotRegion) {
                throw new Error('[galeforce]: Invalid /riot region provided.');
            } else if (target.type === 'ddragon' && !isDataDragonRegion) {
                throw new Error('[galeforce]: Invalid Data Dragon region provided.');
            } else if (typeof target.type === 'undefined' && !(isLeagueRegion || isValorantRegion || isRiotRegion || isDataDragonRegion)) {
                throw new Error('[galeforce]: Invalid region provided.');
            }
            break;
        }

        case 'queue': // Queue check in case types are not followed
            if (target.type === 'lol' && !Object.values(LeagueQueue).includes(value as LeagueQueue)) {
                throw new Error('[galeforce]: Invalid /lol queue type provided.');
            } else if (target.type === 'val' && !Object.values(ValorantQueue).includes(value as ValorantQueue)) {
                throw new Error('[galeforce]: Invalid /val queue type provided.');
            }
            break;
        case 'tier': // Tier check in case types are not followed
            if (!Object.values(Tier).includes(value as Tier)) {
                throw new Error('[galeforce]: Invalid ranked tier provided.');
            }
            break;
        case 'division': // Division check in case types are not followed
            if (!Object.values(Division).includes(value as Division)) {
                throw new Error('[galeforce]: Invalid ranked division provided.');
            }
            break;
        case 'game': // Game check in case types are not followed
            if (!Object.values(Game).includes(value as Game)) {
                throw new Error('[galeforce]: Invalid game provided.');
            }
            break;
        case 'summonerId':
        case 'accountId':
        case 'puuid':
            if (typeof value !== 'string') {
                throw new Error(`[galeforce]: ${name} must be a string.`);
            }
            // Enforce length requirements for summonerId, accountId, puuid as dictated by Riot specifications
            if (name === 'summonerId' && value.length > 63) {
                throw new Error('[galeforce]: summonerId is invalid according to Riot specifications (length > 63).');
            } else if (name === 'accountId' && value.length > 56) {
                throw new Error('[galeforce]: accountId is invalid according to Riot specifications (length > 56).');
            } else if (name === 'puuid' && value.length > 78) {
                throw new Error('[galeforce]: puuid is invalid according to Riot specifications (length > 78).');
            }
            break;
        case 'version':
            if (typeof value !== 'string') {
                throw new Error(`[galeforce]: ${name} must be a string.`);
            }
            // Regex check of valid League of Legends versions
            if (!(/^([0-9]+)\.([0-9]+)\.([0-9]+)$/.test(value)) && !(/^lolpatch_([0-9]+)\.([0-9]+)$/.test(value))) {
                throw new Error(`[galeforce]: Invalid ${name} provided (failed regex check).`);
            }
            break;
        case 'locale':
            if (typeof value !== 'string') {
                throw new Error(`[galeforce]: ${name} must be a string.`);
            }
            // Regex check of valid locale formats
            if (!(/^[a-z]{2}_[A-Z]{2}$/.test(value))) {
                throw new Error(`[galeforce]: Invalid ${name} provided (failed regex check).`);
            }
            break;
        default:
            // Throw an error if the key does not exist on the payload interface
            if (!payloadKeys.includes(name)) {
                return false;
            }
        }

        target[name] = value;
        return true;
    },
    ownKeys: (target: Payload): ArrayLike<string | symbol> => payloadKeys,
});

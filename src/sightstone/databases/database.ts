/*
    The DatabaseInternal class is an abstract class used to model database
    internal functions for MongoDB. These methods can be generalized to future
    database types as well.
*/

import MatchInterface from '../interfaces/match';
import SummonerInterface from '../interfaces/summoner';

abstract class DatabaseInternal {
    protected URI: string;

    constructor(URI: string) {
        this.URI = URI;
    }

    public abstract filterMatch(query: object, projection?: object | string[]): Promise<MatchInterface[]>;

    public abstract setMatch(data: MatchInterface): Promise<MatchInterface>;

    public abstract upsertMatch(data: MatchInterface): Promise<MatchInterface | null>;

    public abstract filterSummoner(query: object, projection?: object | string[]): Promise<SummonerInterface[]>;

    public abstract setSummoner(data: SummonerInterface): Promise<SummonerInterface>;

    public abstract upsertSummoner(data: SummonerInterface): Promise<SummonerInterface | null>;
}

export default DatabaseInternal;

/*
    The DatabaseInternal class is an abstract class used to model database
    internal functions for MongoDB. These methods can be generalized to future
    database types as well.
*/

import MatchInterface from "../interfaces/match";
import SummonerInterface from "../interfaces/summoner";

abstract class DatabaseInternal {
    protected URI: string;

    constructor(URI: string) {
        this.URI = URI;
    }

    public abstract getMatch(query: object): Promise<MatchInterface[]>;
    public abstract setMatch(data: MatchInterface): Promise<MatchInterface>;
    public abstract getSummoner(query: object): Promise<SummonerInterface[]>;
    public abstract setSummoner(data: SummonerInterface): Promise<SummonerInterface>;
}

export default DatabaseInternal;
/*
    The FilterSummoner class represents an Action that filters summoner data from
    the MongoDB given the query when its start method is called. The start
    method will return a promise with the values from the filter call to
    the database.
*/

import Action from "./action";
import SummonerInterface from "../interfaces/summoner";
import {default as RiotAPIModule} from "../../riot-api";
import DatabaseInternal from "../databases/database";

class FilterSummoners extends Action {
    private query: object;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, query: object) {
        super(RiotAPI, database);
        this.query = query;
    }

    public async run(): Promise<SummonerInterface[]> {
        return this.database.getSummoner(this.query);
    }
}

export default FilterSummoners;
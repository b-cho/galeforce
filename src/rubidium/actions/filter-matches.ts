/*
    The FilterMatches class represents an Action that filters matches from
    the MongoDB given the query when its start method is called. The start
    method will return a promise with the values from the filter call to
    the database.
*/

import Action from "./action";
import MatchInterface from "../interfaces/match";
import {default as RiotAPIModule} from "../../riot-api";
import DatabaseInternal from "../databases/database";

class FilterMatches extends Action {
    private query: object;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, query: object) {
        super(RiotAPI, database);
        this.query = query;
    }

    public async run(): Promise<MatchInterface[]> {
        return this.database.getMatch(this.query);
    }
}

export default FilterMatches;
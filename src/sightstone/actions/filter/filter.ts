/*
    The abstract Filter class represents an Action that filters objects from
    the MongoDB given the query when its start method is called. The start
    method will return a promise with the values from the filter call to
    the database.
*/

import Action from '../action';
import MatchInterface from '../../interfaces/match';
import RiotAPIModule from '../../../riot-api';
import DatabaseInternal from '../../databases/database';
import SummonerInterface from '../../interfaces/summoner';

abstract class FilterAction extends Action {
    protected query: object;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, query: object) {
        super(RiotAPI, database);
        this.query = query;
    }

    public abstract async run(): Promise<MatchInterface[] | SummonerInterface[]>;
}

export default FilterAction;

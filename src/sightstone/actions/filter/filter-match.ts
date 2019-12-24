/*
    The FilterMatches class represents an Action that filters matches from
    the MongoDB given the query when its start method is called. The start
    method will return a promise with the values from the filter call to
    the database.
*/

import MatchInterface from '../../interfaces/match';
import FilterAction from './filter';

class FilterMatches extends FilterAction {
    public async run(): Promise<MatchInterface[]> {
        return this.database.filterMatch(this.query);
    }
}

export default FilterMatches;

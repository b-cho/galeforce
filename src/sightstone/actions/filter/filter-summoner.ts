/*
    The FilterSummoner class represents an Action that filters summoner data from
    the MongoDB given the query when its start method is called. The start
    method will return a promise with the values from the filter call to
    the database.
*/

import SummonerInterface from '../../interfaces/summoner';
import FilterAction from './filter';

class FilterSummoners extends FilterAction {
    public async run(): Promise<SummonerInterface[]> {
        if (typeof this.projection !== 'undefined') return this.database.filterSummoner(this.query, this.projection);
        return this.database.filterSummoner(this.query);
    }
}

export default FilterSummoners;

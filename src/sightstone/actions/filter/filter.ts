/*
    The abstract Filter class represents an Action that filters objects from
    the MongoDB given the query when its start method is called. The start
    method will return a promise with the values from the filter call to
    the database.
*/

import Action from '../action';
import MatchInterface from '../../interfaces/match';
import SummonerInterface from '../../interfaces/summoner';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

abstract class FilterAction extends Action {
    protected query: object;

    protected projection?: object | string[];

    constructor(SubmoduleMap: SubmoduleMapInterface, query: object, projection?: object | string[]) {
        super(SubmoduleMap);
        this.query = query;
        this.projection = projection;
    }

    public abstract async run(): Promise<MatchInterface[] | SummonerInterface[]>;
}

export default FilterAction;

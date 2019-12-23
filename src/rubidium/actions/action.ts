/*
    The base Action class that all other composite actions should
    inherit from.
*/

import RiotAPIModule from '../../riot-api';
import DatabaseInternal from '../databases/database';

abstract class Action {
    protected RiotAPI: RiotAPIModule;

    protected database: DatabaseInternal;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal) {
        this.RiotAPI = RiotAPI;
        this.database = database;
    }

    public abstract async run(): Promise<any>;
}

export default Action;

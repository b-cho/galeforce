/*
    The SetMatches class extends Action and provides a way to set a list
    of match objects (determined by the MatchModel object) in the database.
*/

import MatchInterface from '../interfaces/match';
import Action from './action';
import RiotAPIModule from '../../riot-api';
import DatabaseInternal from '../databases/database';

class SetMatch extends Action {
    private match: MatchInterface;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, match: MatchInterface) {
        super(RiotAPI, database);
        this.match = match;
    }

    public async run(): Promise<void> {
        this.database.setMatch(this.match);
    }
}

export default SetMatch;

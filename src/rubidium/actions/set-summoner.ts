/*
    The SetSummoner class extends Action and provides a way to set a list
    of summoner objects (determined by the SummonerModel object) in the database.
*/

import SummonerInterface from '../interfaces/summoner';
import Action from './action';
import RiotAPIModule from '../../riot-api';
import DatabaseInternal from '../databases/database';

class SetSummoners extends Action {
    private summoner: SummonerInterface;

    constructor(RiotAPI: RiotAPIModule, database: DatabaseInternal, summoner: SummonerInterface) {
        super(RiotAPI, database);
        this.summoner = summoner;
    }

    public async run(): Promise<void> {
        this.database.setSummoner(this.summoner);
    }
}

export default SetSummoners;

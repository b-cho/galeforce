/*
    The SetSummoner class extends Action and provides a way to set a list
    of summoner objects (determined by the SummonerModel object) in the database.
*/

import SummonerInterface from '../../interfaces/summoner';
import Action from '../action';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class SetSummoner extends Action {
    private summoner: SummonerInterface;

    constructor(SubmoduleMap: SubmoduleMapInterface, summoner: SummonerInterface) {
        super(SubmoduleMap);
        this.summoner = summoner;
    }

    public async run(): Promise<void> {
        this.database.setSummoner(this.summoner);
    }
}

export default SetSummoner;

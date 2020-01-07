/*
    The ChampionToId action simply converts a given champion name to the
    corresponding ID in the champion.json Data Dragon file.
*/

import Action from '../action';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class ChampionToId extends Action {
    protected champion: string;

    constructor(SubmoduleMap: SubmoduleMapInterface, champion: string) {
        super(SubmoduleMap);
        this.champion = champion;
    }

    public async run(): Promise<number> {
        return this.RiotAPI.internal.championToId(this.champion);
    }
}

export default ChampionToId;

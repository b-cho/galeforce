/*
    The IdToChampion action simply converts a given champion ID to the
    corresponding name in the champion.json Data Dragon file.
*/

import Action from '../action';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class IdToChampion extends Action {
    protected id: number;

    constructor(SubmoduleMap: SubmoduleMapInterface, id: number) {
        super(SubmoduleMap);
        this.id = id;
    }

    public async run(): Promise<string> {
        return this.RiotAPI.internal.idToChampion(this.id);
    }
}

export default IdToChampion;

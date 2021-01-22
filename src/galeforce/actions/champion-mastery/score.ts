import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetMasteryScore extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.CHAMPION_MASTERY.SCORE;
    }

    public summonerId(summonerId: string): this {
        this.payload.summonerId = summonerId;
        return this;
    }

    public async exec(): Promise<number> {
        return this.run<number>();
    }
}

export default GetMasteryScore;

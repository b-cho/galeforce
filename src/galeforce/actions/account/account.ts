/*
    The GetSummoner class extends Action and provides a way to get all relevant
    summoner data from the Riot API and add it to data.
*/

import Action from '../action';
import { AccountInterface } from '../../interfaces/dto';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetAccount extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.setEndpoint(ENDPOINTS.ACCOUNT.PUUID);
    }

    public puuid(puuid: string): this {
        this.payload.setPuuid(puuid);
        return this;
    };

    public gameName(gameName: string): this {
        this.payload.setGameName(gameName);
        return this;
    }

    public tagLine(tagLine: string): this {
        this.payload.setEndpoint(ENDPOINTS.ACCOUNT.RIOT_ID);
        this.payload.setTagLine(tagLine);
        return this;
    }

    public async exec(): Promise<AccountInterface> {
        if(this.payload.payload.gameName && !this.payload.payload.tagLine) {
            throw new Error('[galeforce]: .gameName() must be chained with .tagLine().')
        }
        return this.run<AccountInterface>();
    }
}

export default GetAccount;

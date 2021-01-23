import Action from '../action';
import { AccountInterface } from '../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../riot-api';
import SubmoduleMapInterface from '../../interfaces/submodule-map';

class GetAccount extends Action {
    constructor(SubmoduleMap: SubmoduleMapInterface) {
        super(SubmoduleMap);
        this.payload.endpoint = ENDPOINTS.ACCOUNT.PUUID;
        this.payload.type = 'riot';
    }

    public region: (region: RiotRegion) => this = super.region;

    public puuid(puuid: string): this {
        this.payload.puuid = puuid;
        return this;
    }

    public gameName(gameName: string): this {
        this.payload.gameName = gameName;
        return this;
    }

    public tagLine(tagLine: string): this {
        this.payload.endpoint = ENDPOINTS.ACCOUNT.RIOT_ID;
        this.payload.tagLine = tagLine;
        return this;
    }

    public async exec(): Promise<AccountInterface> {
        if (this.payload.gameName && !this.payload.tagLine) {
            throw new Error('[galeforce]: .gameName() must be chained with .tagLine().');
        }
        return this.run<AccountInterface>();
    }
}

export default GetAccount;

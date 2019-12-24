import RiotAPIModule from '../riot-api';
import getConfig from './configs/default';
import ConfigInterface from './interfaces/config';
import DatabaseInternal from './databases/database';
import MongoDBInternal from './databases/mongo-db';
import MatchInterface from './interfaces/match';
import SummonerInterface from './interfaces/summoner';
import FetchMatchByID from './actions/fetch/fetch-match';
import FetchSummonerByName from './actions/fetch/fetch-summoner';
import FilterMatches from './actions/filter/filter-match';
import FilterSummoners from './actions/filter/filter-summoner';
import SetMatch from './actions/set/set-match';
import SetSummoner from './actions/set/set-summoner';
import UpsertMatch from './actions/upsert/upsert-match';
import UpsertSummoner from './actions/upsert/upsert-summoner';
import GetMasteryLeaderboard from './actions/analysis/mastery/get-leaderboard';
import VerifyThirdPartyCode from './actions/analysis/verify/verify';

interface SightstoneSummonerInterface {
    fetch: {
        byName: (server: string, username: string, endIndex?: number) => FetchSummonerByName;
    };
    filter: (query: object, projection?: object | string[]) => FilterSummoners;
    set: (summoner: SummonerInterface) => SetSummoner;
    upsert: (summoner: SummonerInterface) => UpsertSummoner;
}

interface SightstoneMatchInterface {
    fetch: {
        byMatchId: (server: string, matchId: number) => FetchMatchByID;
    };
    filter: (query: object, projection?: object | string[]) => FilterMatches;
    set: (match: MatchInterface) => SetMatch;
    upsert: (match: MatchInterface) => UpsertMatch;
}

interface SightstoneThirdPartyInterface {
    verify: {
        bySummonerId: (server: string, summonerId: string, verify: string) => VerifyThirdPartyCode;
    };
}

interface SightstoneAnalysisInterface {
    mastery: {
        getLeaderboard: (champion: number) => GetMasteryLeaderboard;
    };
}

class Sightstone {
    private config: ConfigInterface;

    private RiotAPI: RiotAPIModule;

    private database: DatabaseInternal;

    constructor(options: ConfigInterface | string) {
        if (typeof options === 'string') this.config = getConfig(options);
        else this.config = options;

        this.RiotAPI = new RiotAPIModule(this.config['riot-api'].key, this.config['riot-api'].ddversion);

        if (this.config.database.type === 'mongodb') {
            this.database = new MongoDBInternal(this.config.database.uri);
        } else {
            throw new Error('Invalid database type selected in config.');
        }
    }

    public async init(): Promise<void> {
        await this.RiotAPI.init();
    }

    public summoner: SightstoneSummonerInterface = {
        fetch: {
            byName: (server: string, username: string, endIndex?: number): FetchSummonerByName => new FetchSummonerByName(this.RiotAPI, this.database, server, username, endIndex),
        },
        filter: (query: object, projection?: object | string[]): FilterSummoners => new FilterSummoners(this.RiotAPI, this.database, query, projection),
        set: (summoner: SummonerInterface): SetSummoner => new SetSummoner(this.RiotAPI, this.database, summoner),
        upsert: (summoner: SummonerInterface): UpsertSummoner => new UpsertSummoner(this.RiotAPI, this.database, summoner),
    }

    public match: SightstoneMatchInterface = {
        fetch: {
            byMatchId: (server: string, matchId: number): FetchMatchByID => new FetchMatchByID(this.RiotAPI, this.database, server, matchId),
        },
        filter: (query: object, projection?: object | string[]): FilterMatches => new FilterMatches(this.RiotAPI, this.database, query, projection),
        set: (match: MatchInterface): SetMatch => new SetMatch(this.RiotAPI, this.database, match),
        upsert: (match: MatchInterface): UpsertMatch => new UpsertMatch(this.RiotAPI, this.database, match),
    }

    public thirdParty: SightstoneThirdPartyInterface = {
        verify: {
            bySummonerId: (server: string, summonerId: string, verify: string): VerifyThirdPartyCode => new VerifyThirdPartyCode(this.RiotAPI, this.database, server, summonerId, verify),
        },
    }

    public analysis: SightstoneAnalysisInterface = {
        mastery: {
            getLeaderboard: (champion: number): GetMasteryLeaderboard => new GetMasteryLeaderboard(this.RiotAPI, this.database, champion),
        },
    }
}

export { getConfig };
export default Sightstone;

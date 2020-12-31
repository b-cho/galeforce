/*
    The GetMasteryLeaderboard action gets the mastery leaderboard/standings
    for the given champion using the database.filterSummoner() function.
*/

import Action from '../../action';
import SubmoduleMapInterface from '../../../interfaces/submodule-map';

interface LimitedLeagueData {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
}

interface LimitedSummonerData {
    summoner: {
        name: string;
        server: string;
    };
    league: LimitedLeagueData[];
}

interface FilteredArrayInterface {
    name: string;
    server: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
}

class GetRankedLeaderboard extends Action {
    private queueTypes: string[];

    private tierToLeaguePoints: { [key: string]: number } = {
        IRON: 0,
        BRONZE: 400,
        SILVER: 800,
        GOLD: 1200,
        PLATINUM: 1600,
        DIAMOND: 2000,
        MASTER: 2400,
        GRANDMASTER: 2400,
        CHALLENGER: 2400,
    };

    private rankToLeaguePoints: { [key: string]: number } = {
        IV: 0,
        III: 100,
        II: 200,
        I: 300,
    }

    constructor(SubmoduleMap: SubmoduleMapInterface, queueTypes: string[]) {
        super(SubmoduleMap);
        this.queueTypes = queueTypes;
    }

    private convertToLeaguePoints(filteredArrayInterface: FilteredArrayInterface): number {
        if (!['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(filteredArrayInterface.tier)) {
            return this.tierToLeaguePoints[filteredArrayInterface.tier] + this.rankToLeaguePoints[filteredArrayInterface.rank] + filteredArrayInterface.leaguePoints;
        }
        return this.tierToLeaguePoints[filteredArrayInterface.tier] + filteredArrayInterface.leaguePoints;
    }

    public async run(): Promise<FilteredArrayInterface[][]> {
        const query: object = { league: { $elemMatch: { queueType: { $in: this.queueTypes } } } };
        const projection: string[] = ['summoner.server', 'summoner.name', 'league.queueType', 'league.tier', 'league.rank', 'league.leaguePoints'];
        const filteredData: LimitedSummonerData[] = await this.database.filterSummoner(query, projection);
        // Restructure filteredData to allow for efficient sorting.
        const combinedFilteredArray: FilteredArrayInterface[][] = [];
        this.queueTypes.forEach((queueType) => {
            const filteredArray: FilteredArrayInterface[] = [];
            filteredData.forEach((summonerData: LimitedSummonerData) => {
                const LMDElem: LimitedLeagueData | undefined = summonerData.league.find((elem: LimitedLeagueData) => elem.queueType === queueType);
                if (typeof LMDElem !== 'undefined') {
                    const { queueType, tier, rank, leaguePoints }: LimitedLeagueData = LMDElem;

                    filteredArray.push({
                        name: summonerData.summoner.name,
                        server: summonerData.summoner.server,
                        queueType,
                        tier,
                        rank,
                        leaguePoints,
                    });
                }
            });

            filteredArray.sort((a: FilteredArrayInterface, b: FilteredArrayInterface) => Math.sign(this.convertToLeaguePoints(b) - this.convertToLeaguePoints(a))); // Reverse order
            combinedFilteredArray.push(filteredArray);
        });
        return combinedFilteredArray;
    }
}

export default GetRankedLeaderboard;

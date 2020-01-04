/*
    The GetMasteryLeaderboard action gets the mastery leaderboard/standings
    for the given champion using the database.filterSummoner() function.
*/

import Action from '../../action';
import SubmoduleMapInterface from '../../../interfaces/submodule-map';

interface LimitedMasteryData {
    championId: number;
    championPoints: number;
}

interface LimitedSummonerData {
    summoner: {
        name: string;
        server: string;
    };
    mastery: LimitedMasteryData[];
}

interface FilteredArrayInterface {
    name: string;
    server: string;
    masteryPoints: number;
}

class GetMasteryLeaderboard extends Action {
    private champion: number;

    constructor(SubmoduleMap: SubmoduleMapInterface, champion: number) {
        super(SubmoduleMap);
        this.champion = champion;
    }

    public async run(): Promise<object[]> {
        const query: object = { mastery: { $elemMatch: { championId: this.champion } } };
        const projection: string[] = ['summoner.server', 'summoner.name', 'mastery.championPoints', 'mastery.championId'];
        const filteredData: LimitedSummonerData[] = await this.database.filterSummoner(query, projection);

        // Restructure filteredData to allow for efficient sorting.
        const filteredArray: FilteredArrayInterface[] = [];
        filteredData.forEach((summonerData: LimitedSummonerData) => {
            const LMDElem: LimitedMasteryData | undefined = summonerData.mastery.find((elem: LimitedMasteryData) => elem.championId === this.champion);
            if (typeof LMDElem !== 'undefined') {
                const points: number = LMDElem.championPoints;
                filteredArray.push({
                    name: summonerData.summoner.name,
                    server: summonerData.summoner.server,
                    masteryPoints: points,
                });
            }
        });

        filteredArray.sort((a: FilteredArrayInterface, b: FilteredArrayInterface) => Math.sign(b.masteryPoints - a.masteryPoints)); // Reverse order

        return filteredArray;
    }
}

export default GetMasteryLeaderboard;

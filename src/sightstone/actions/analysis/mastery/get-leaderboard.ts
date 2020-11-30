/*
    The GetMasteryLeaderboard action gets the mastery leaderboard/standings
    for the given champion using the database.filterSummoner() function.
*/

import Action from '../../action';
import SubmoduleMapInterface from '../../../interfaces/submodule-map';

interface LimitedMasteryData {
    championId: number;
    championPoints: number;
    championLevel: number;
    lastPlayTime: number;
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
    champion: number;
    masteryPoints: number;
    masteryLevel: number;
    lastPlayTime: number;
}

class GetMasteryLeaderboard extends Action {
    private ids: number[];

    constructor(SubmoduleMap: SubmoduleMapInterface, ids: number[]) {
        super(SubmoduleMap);
        this.ids = ids;
    }

    public async run(): Promise<FilteredArrayInterface[][]> {
        const query: object = { mastery: { $elemMatch: { championId: { $in: this.ids } } } };
        const projection: string[] = ['summoner.server', 'summoner.name', 'mastery.championPoints', 'mastery.championId', 'mastery.championLevel', 'mastery.lastPlayTime'];
        const filteredData: LimitedSummonerData[] = await this.database.filterSummoner(query, projection);
        // Restructure filteredData to allow for efficient sorting.
        const combinedFilteredArray: FilteredArrayInterface[][] = [];
        this.ids.forEach((id) => {
            const filteredArray: FilteredArrayInterface[] = [];
            filteredData.forEach((summonerData: LimitedSummonerData) => {
                const LMDElem: LimitedMasteryData | undefined = summonerData.mastery.find((elem: LimitedMasteryData) => elem.championId === id);
                if (typeof LMDElem !== 'undefined') {
                    const champion: number = LMDElem.championId;
                    const masteryPoints: number = LMDElem.championPoints;
                    const masteryLevel: number = LMDElem.championLevel;
                    const lastPlayTime: number = LMDElem.lastPlayTime;

                    filteredArray.push({
                        name: summonerData.summoner.name,
                        server: summonerData.summoner.server,
                        champion,
                        masteryPoints,
                        masteryLevel,
                        lastPlayTime,
                    });
                }
            });

            filteredArray.sort((a: FilteredArrayInterface, b: FilteredArrayInterface) => Math.sign(b.masteryPoints - a.masteryPoints)); // Reverse order
            combinedFilteredArray.push(filteredArray);
        });
        return combinedFilteredArray;
    }
}

export default GetMasteryLeaderboard;

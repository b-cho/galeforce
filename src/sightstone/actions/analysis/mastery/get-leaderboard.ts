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
    masteryPoints: number;
    masteryLevel: number;
    lastPlayTime: number;
}

class GetMasteryLeaderboard extends Action {
    private id: number;

    constructor(SubmoduleMap: SubmoduleMapInterface, id: number) {
        super(SubmoduleMap);
        this.id = id;
    }

    public async run(): Promise<object[]> {
        const query: object = { mastery: { $elemMatch: { championId: this.id } } };
        const projection: string[] = ['summoner.server', 'summoner.name', 'mastery.championPoints', 'mastery.championId', 'mastery.championLevel', 'mastery.lastPlayTime'];
        const filteredData: LimitedSummonerData[] = await this.database.filterSummoner(query, projection);
        // Restructure filteredData to allow for efficient sorting.
        const filteredArray: FilteredArrayInterface[] = [];
        filteredData.forEach((summonerData: LimitedSummonerData) => {
            const LMDElem: LimitedMasteryData | undefined = summonerData.mastery.find((elem: LimitedMasteryData) => elem.championId === this.id);
            if (typeof LMDElem !== 'undefined') {
                const masteryPoints: number = LMDElem.championPoints;
                const masteryLevel: number = LMDElem.championLevel;
                const lastPlayTime: number = LMDElem.lastPlayTime;

                filteredArray.push({
                    name: summonerData.summoner.name,
                    server: summonerData.summoner.server,
                    masteryPoints,
                    masteryLevel,
                    lastPlayTime,
                });
            }
        });

        filteredArray.sort((a: FilteredArrayInterface, b: FilteredArrayInterface) => Math.sign(b.masteryPoints - a.masteryPoints)); // Reverse order
        return filteredArray;
    }
}

export default GetMasteryLeaderboard;

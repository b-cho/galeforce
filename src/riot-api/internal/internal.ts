/*
    This class consists of static methods that handle the internals of the Riot 
    API system. This consists of the following functions:
    - Conversion between champion ID and name
*/

import DataDragonRequest from "../requests/data-dragon-request";
import DataDragonEndpoints from "../enums/data-dragon";

class RiotAPIInternal {
    private championData: any;

    // Empty constructor.
    constructor() {}

    /** 
     * Simply initializes the function by making relevant API calls and setting local variables.
     * 
     * @async
     * @public
    */
    public async init(): Promise<void> {
        let championRequest: DataDragonRequest = new DataDragonRequest(DataDragonEndpoints.CHAMPION);

        this.championData = await championRequest.get();
    }
    /** 
     * Convert integer to champion name.
     * 
     * @public
     * @param {Number} cid The ID of the champion in question.
     * 
     * @return {String} The corresponding champion name.
    */
    public idToChampion(cid: number): string {
        let ret: string = "";
        Object.keys(this.championData.data).forEach((k) => {
            if(parseInt(this.championData.data[k].key) == cid) {
                ret = k;
                return;
            }
        });
        return ret;
    }

    /** 
     * Convert champion name to integer.
     * 
     * @public
     * @param {Number} name The name of the champion in question.
     * 
     * @return {String} The corresponding champion ID.
    */
    public championToId(name: string): number {
        name = name.replace(/[^A-Za-z]/g, '');
        return parseInt(this.championData.data[name].key);
    }
}

export default RiotAPIInternal;
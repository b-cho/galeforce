/*
    This class consists of static methods that handle the internals of the Riot
    API system. This consists of the following functions:
    - Conversion between champion ID and name
*/

import DataDragonRequest from '../requests/data-dragon-request';
import DataDragonEndpoints from '../enums/data-dragon';

class RiotAPIInternal {
    private championData: any = null;

    private version: string;

    constructor(version: string) {
        this.version = version;
    }

    /**
     * Simply initializes the function by making relevant API calls and setting local variables.
     *
     * @async
     * @public
    */
    public async init(): Promise<void> {
        const championRequest: DataDragonRequest = new DataDragonRequest(DataDragonEndpoints.CHAMPION, this.version);

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
        if (this.championData === null) {
            throw new Error(`
                [sightstone]: Data Dragon champion data has not been loaded yet.
                Make sure to call Sightstone.init(() => { /* code */ }). (no-init)
            `);
        }
        let ret = '';

        Object.keys(this.championData.data).forEach((k) => {
            if (parseInt(this.championData.data[k].key, 10) === cid) ret = k;
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
        if (this.championData === null) {
            throw new Error(`
                [sightstone]: Data Dragon champion data has not been loaded yet.
                Make sure to call Sightstone.init(() => { /* code */ }). (no-init)
            `);
        }
        return parseInt(this.championData.data[name].key, 10);
    }
}

export default RiotAPIInternal;

import async from 'async';
import minimist from 'minimist';
import SightstoneModule, { getConfig } from '../sightstone';
import ConfigInterface from '../sightstone/interfaces/config';
import SummonerInterface from '../sightstone/interfaces/summoner';

const argv = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Sightstone: SightstoneModule = new SightstoneModule(config);

async function update(server: string, username: string) {
    const summonerData: SummonerInterface = await Sightstone.summoner.fetch.byName(server, username, 1).run();
    Sightstone.summoner.upsert(summonerData).run();
    // Update matches into database as well
    let match: any = summonerData.matchlist.matches[0];
    const matchData = await Sightstone.match.fetch.byMatchId(match.platformId, match.gameId).run();
    Sightstone.match.upsert(matchData).run();

    return matchData.participantIdentities.map((x: any) => x.player.summonerName);
}

Sightstone.init().then(async () => {
    console.log(config);
    let visited: any = ['SSG Xayah'];
    let nextArray: any = await update('na1', 'SSG Xayah');
    while (true) {
        let next = nextArray.shift();
        if(!visited.includes(next)) {
            console.log(next);
            let newArray = await update('na1', next).catch((err) => console.log(err));
            visited.push(next);
            if(typeof newArray !== 'undefined') {
                newArray.forEach((x: any) => nextArray.push(x));
            }
        }
    }
});
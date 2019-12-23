/*
    The SummonerInterface is an interface to store summoner data in
    for relevant databases.
*/

interface SummonerInterface {
    summoner: {
        puuid: string; // We assert that the puuid element exists and has type string.
        [propName: string]: any; // Ignore other types.
    };
    league: object;
    mastery: object;
    matchlist: object;
}

export default SummonerInterface;

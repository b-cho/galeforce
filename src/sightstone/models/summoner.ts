/*
    The MongoDB schema for summoner data.
*/

import mongoose, { Schema } from 'mongoose';
import MongoDBSummonerInterface from '../interfaces/summoner-mongodb';

const summonerSchema = new Schema({
    summoner: Object,
    league: Object,
    matchlist: Object,
    mastery: Object,
});

export default mongoose.model<MongoDBSummonerInterface>('Summoner', summonerSchema);

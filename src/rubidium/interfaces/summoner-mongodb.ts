import mongoose from 'mongoose';
import SummonerInterface from './summoner';

interface MongoDBSummonerInterface extends SummonerInterface, mongoose.Document {}

export default MongoDBSummonerInterface;

import SummonerInterface from "./summoner";
import mongoose from "mongoose";

interface MongoDBSummonerInterface extends SummonerInterface, mongoose.Document {};

export default MongoDBSummonerInterface;
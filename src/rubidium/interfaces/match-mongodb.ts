import MatchInterface from "./match";
import mongoose from "mongoose";

interface MongoDBMatchInterface extends MatchInterface, mongoose.Document {};

export default MongoDBMatchInterface;
/*
    The MongoDB schema for match data.
*/

import mongoose, { Schema } from "mongoose";
import MongoDBMatchInterface from "../interfaces/match-mongodb";

let matchSchema = new Schema({
    gameId: Number,
    gameCreation: Number,
    gameDuration: Number,
    gameMode: String,
    gameType: String,
    gameVersion: String,
    mapId: Number,
    participantIdentities: [],
    participants: [],
    platformId: String,
    queueId: String,
    seasonId: String,
    teams: [],
    timeline: []
});

export default mongoose.model<MongoDBMatchInterface>('Match', matchSchema);
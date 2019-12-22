/*
    The MongoDB class saves the relevant information passed into it into
    MongoDB using mongoose.
*/

import DatabaseInternal from "./database";
import mongoose from "mongoose";
import MatchModel from "../models/match";
import SummonerModel from "../models/summoner";
import MatchInterface from "../interfaces/match";
import SummonerInterface from "../interfaces/summoner";

class MongoDBInternal extends DatabaseInternal {
    constructor(URI: string){
        super(URI);   
        mongoose.connect(this.URI);
    }

    public async getMatch(query: object): Promise<MatchInterface[]> {
        return MatchModel.find(query).exec();
    }

    public async setMatch(data: MatchInterface): Promise<MatchInterface> {
        let match = new MatchModel(data);
        return match.save();
    }

    public async getSummoner(query: object): Promise<SummonerInterface[]> {
        return SummonerModel.find(query).exec();
    }

    public async setSummoner(data: SummonerInterface): Promise<SummonerInterface> {
        let summoner = new SummonerModel(data);
        return summoner.save();
    }
}

export default MongoDBInternal;
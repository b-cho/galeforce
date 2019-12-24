/* eslint-disable class-methods-use-this */
/*
    The MongoDB class saves the relevant information passed into it into
    MongoDB using mongoose.
*/

import mongoose from 'mongoose';
import DatabaseInternal from './database';
import MatchModel from '../models/match';
import SummonerModel from '../models/summoner';
import MatchInterface from '../interfaces/match';
import SummonerInterface from '../interfaces/summoner';

class MongoDBInternal extends DatabaseInternal {
    constructor(URI: string) {
        super(URI);
        mongoose.set('useNewUrlParser', true); // Preventing deprecation warnings.
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useFindAndModify', false);
        mongoose.connect(this.URI);
    }

    public async filterMatch(query: object, projection?: object | string[]): Promise<MatchInterface[]> {
        if (Array.isArray(projection)) return MatchModel.find(query, projection.join(' ')).exec();
        if (typeof projection === 'object') return MatchModel.find(query, projection).exec();
        return MatchModel.find(query).exec();
    }

    public async setMatch(data: MatchInterface): Promise<MatchInterface> {
        const match = new MatchModel(data);
        return match.save();
    }

    public async upsertMatch(data: MatchInterface): Promise<MatchInterface | null> {
        const query: object = { gameId: data.gameId };
        const update: MatchInterface = data;
        const options: object = { upsert: true, new: true, setDefaultsOnInsert: true };
        const model: Promise<MatchInterface | null> = MatchModel.findOneAndUpdate(query, update, options).exec();
        return model;
    }

    public async filterSummoner(query: object, projection?: object | string[]): Promise<SummonerInterface[]> {
        if (Array.isArray(projection)) return SummonerModel.find(query, projection.join(' ')).exec();
        if (typeof projection === 'object') return SummonerModel.find(query, projection).exec();
        return SummonerModel.find(query).exec();
    }

    public async setSummoner(data: SummonerInterface): Promise<SummonerInterface> {
        const summoner = new SummonerModel(data);
        return summoner.save();
    }

    public async upsertSummoner(data: SummonerInterface): Promise<SummonerInterface | null> {
        const query: object = { 'summoner.puuid': data.summoner.puuid }; // select by unique PUUID
        const update: SummonerInterface = data;
        const options: object = { upsert: true, new: true, setDefaultsOnInsert: true };
        const model: Promise<SummonerInterface | null> = SummonerModel.findOneAndUpdate(query, update, options).exec();
        return model;
    }
}

export default MongoDBInternal;

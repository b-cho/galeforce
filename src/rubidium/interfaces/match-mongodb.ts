import mongoose from 'mongoose';
import MatchInterface from './match';

interface MongoDBMatchInterface extends MatchInterface, mongoose.Document {}

export default MongoDBMatchInterface;

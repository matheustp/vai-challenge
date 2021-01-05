import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {NonLexicalWord} from "../models/non-lexical-word";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  await NonLexicalWord.collection.createIndex({word: 1}, {unique: true, dropDups: true})
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});


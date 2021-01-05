import {app} from './app';
import mongoose from "mongoose";
import {DefaultNonLexicalWords} from "./utils/default-non-lexical-words";
import {NonLexicalWord} from "./models/non-lexical-word";
import {populateDB} from "./utils/populate-db";


const start = async () => {

    if (process.env.MONGO_URI) {
        if (!process.env.API_KEY) {
            throw new Error('API_KEY environment variable is required when using MongoDB')
        }
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB')
            await NonLexicalWord.collection.createIndex({word: 1}, {unique: true, dropDups: true})
            await populateDB();
        } catch (err) {
            console.error(err);
        }
    }

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening on port: ${process.env.PORT || 3000}`);
    });
}

start();

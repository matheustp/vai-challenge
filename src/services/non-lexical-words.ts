import {DefaultNonLexicalWords} from "../utils/default-non-lexical-words";
import {NonLexicalWord} from "../models/non-lexical-word";

export class NonLexicalWordsService {
    // In this function I have converted the list of words into an object because its faster to check
    // if the word is a key of an object than doing the indexOf lookup in an array
    static async fetchAll(): Promise<{ [key: string]: 1 }> {
        if (!process.env.MONGO_URI) {
            // Used void() method so the reduce function could fit in one line
            return DefaultNonLexicalWords.reduce((p: any, c) => void(p[c] = 1) || p, {})
        }

        const words = await NonLexicalWord.find();
        // Used void() method so the reduce function could fit in one line
        return words.reduce((p: any, c: any) => void(p[c.word] = 1) || p, {});
    }
}

import {DefaultNonLexicalWords} from "../utils/default-non-lexical-words";
import {NonLexicalWord} from "../models/non-lexical-word";

export class NonLexicalWordsService {

    static async fetchAll(): Promise<{ [key: string]: 1 }> {
        if (!process.env.MONGO_URI) {
            return DefaultNonLexicalWords.reduce((p: any, c) => void (p[c] = 1) || p, {})
        }

        const words = await NonLexicalWord.find();
        return words.reduce((p: any, c: any) => void (p[c.word] = 1) || p, {});
    }
}

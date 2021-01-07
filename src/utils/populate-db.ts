import {DefaultNonLexicalWords} from "./default-non-lexical-words";
import {NonLexicalWord} from "../models/non-lexical-word";

async function populateDB()  {
    try {
        await Promise.all(DefaultNonLexicalWords.map((word) => {
            const nonLexicalWord = NonLexicalWord.build({word})
            return nonLexicalWord.save();
        }));
    } catch (err) {
        //Ignore error, in this case its caused by duplicates
    }
}

export {populateDB};

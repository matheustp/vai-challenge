export interface CountWordsStruct {
    totalWords: number,
    lexicalWords: number
}

export class CountWords {
    static count(nonLexicalWords: { [key: string]: 1 }): (p: CountWordsStruct, c: string) => CountWordsStruct {
        return (p: CountWordsStruct, c: string) => {
            const [sanitizedWord] = c.match(/[a-z]+-*[a-z]*/) || []
            if (!sanitizedWord) {
                return p;
            }
            if (!nonLexicalWords[sanitizedWord]) {
                p.lexicalWords++;
            }
            p.totalWords++;
            return p;
        }
    }
}

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { MaxWordCountValidator} from "../validators/max-word-count-validator";
import { validateRequest } from "../middlewares/validate-request";
import { RoundToTwo} from "../helpers/round-to-two";
import {CountWords, CountWordsStruct} from "../services/count-words";
import {NonLexicalWordsService} from "../services/non-lexical-words";

const router = express.Router();

router.post('/complexity',
    [
        body('text')
            .trim()
            .notEmpty()
            .withMessage('The text field is required')
            .matches(/[a-z|0-9]/i)
            .withMessage('The text should have at least one valid word')
            .isLength({max: 1000})
            .withMessage('The text should have up to 1000 characters')
            .custom(MaxWordCountValidator(100))
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        let {text} = req.body;
        const {mode} = req.query;
        text = text.toLowerCase().replace(/(\r\n|\n|\r|\t)/gm, '');

        const nonLexicalWords = await NonLexicalWordsService.fetchAll();

        const resultList = (mode === 'verbose' ? text.split('.') : [text])
            .filter((t:string) => t !== '')
            .map((t:string) => {
              return t
                    .split(' ')
                    .reduce(CountWords.count(nonLexicalWords), {totalWords: 0, lexicalWords: 0});
            });

        const overallCount = resultList.reduce((p: CountWordsStruct, c: CountWordsStruct) => {
            p.totalWords += c.totalWords;
            p.lexicalWords += c.lexicalWords
            return p;
        }, {totalWords: 0, lexicalWords: 0});

        const result:any = {
            data: {
                overall_ld: RoundToTwo(overallCount.lexicalWords / (overallCount.totalWords || 1)),
            }
        }
        if (mode === 'verbose') {
            result.data.sentence_ld = resultList.map((c: CountWordsStruct) => RoundToTwo(c.lexicalWords/(c.totalWords || 1)))
        }
        res.send(result);
    })



export { router as complexityRouter };

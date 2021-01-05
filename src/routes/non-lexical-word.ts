import express, { Request, Response } from 'express';
import { body, header } from 'express-validator';
import { MaxWordCountValidator} from "../validators/max-word-count-validator";
import { validateRequest } from "../middlewares/validate-request";
import { RoundToTwo} from "../helpers/round-to-two";
import {CountWords, CountWordsStruct} from "../services/count-words";
import {DefaultNonLexicalWords} from "../utils/default-non-lexical-words";
import {NonLexicalWordsService} from "../services/non-lexical-words";
import {NonLexicalWord} from "../models/non-lexical-word";
import {requireAuth} from "../middlewares/require-auth";

const router = express.Router();

router.post('/non-lexical-word',
    requireAuth,
    [
        body('word')
            .trim()
            .notEmpty()
            .withMessage('The word field is required')
            .matches(/^[a-z]+\-*[a-z]+$/i)
            .withMessage('The word should be a valid word')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const apiKey = req.headers['x-api-key'];
        if (apiKey !== process.env.API_KEY) {
            return res.status(401).send('Invalid key');
        }
        const {word} = req.body;
        const nlWord = NonLexicalWord.build({word});
        try {
            await nlWord.save();
            res.status(201).send({word});
        } catch (err) {
            res.status(409).send({message: 'The word was already on the database'});
        }
    })

export { router as nonLexicalWordRouter }

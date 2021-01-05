import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error-handler';
import {complexityRouter} from "./routes/complexity";
import {nonLexicalWordRouter} from "./routes/non-lexical-word";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(complexityRouter);
if (process.env.MONGO_URI) {
    app.use(nonLexicalWordRouter);
}

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);
export {app};

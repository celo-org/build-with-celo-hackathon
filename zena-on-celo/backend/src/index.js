import express from 'express';
import bodyParser from 'body-parser';

import { apiRouter } from "./apiRouter.js";
import initDB from './database/db.js';

const app = express()


app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", apiRouter);

initDB();
app.listen(3001, () => console.log('Server is listening'))

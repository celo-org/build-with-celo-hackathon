import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import { apiRouter } from "./apiRouter.js";
import initDB from './database/db.js';

const app = express()
app.use(cors())


app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", apiRouter);

initDB();
app.listen(8080, () => console.log('Server is listening'))

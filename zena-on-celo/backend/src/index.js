import express from 'express';
import bodyParser from 'body-parser';

import { apiRouter } from "./apiRouter.js";

const app = express()

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init
// db.defaults({ posts: [] }).write()
app.use("/api", apiRouter);

app.listen(3001, () => console.log('Server is listening'))

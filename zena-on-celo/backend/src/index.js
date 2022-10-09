import express from 'express';
import bodyParser from 'body-parser';

import { apiRouter } from "./apiRouter.js";

const app = express()

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init
db.defaults({
  "users": [
    {
      "id": 1,
      "name": "Blue",
      "pubKey": 123,
      "privKey": 456,
      "stats": {
        "quiz1": 0,
        "quiz2": 0,
        "quiz3": 0,
        "quiz4": 0
      }
    }
  ]
}).write()
app.use("/api", apiRouter);

app.listen(3001, () => console.log('Server is listening'))

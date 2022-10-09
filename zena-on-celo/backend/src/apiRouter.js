import express from 'express';
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { createWallet } from "./ethService.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, './database/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export const apiRouter = express.Router();
apiRouter.use(function (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Routes
apiRouter.get('/users', async (req, res) => {
    await db.read()
    res.send(db.data.users)
})

apiRouter.post('/users', async (req, res) => {
    await db.read()
    const userData = req.body.user;
    createWallet();
    // res.send(db.data.users)
})


apiRouter.get('/users/:id', async (req, res) => {
    await db.read()
    const user = db.data.users?.filter(user => user.id === parseInt(req.params.id))
    res.send(user)
})

apiRouter.put('/users/:id', async (req, res) => {
    await db.read()
    db.data.users = db.data.users?.map(user => {
        if (user.id === parseInt(req.params.id)) {
            const userData = req.body.user;
            return userData;
        } else {
            return user
        }
    })
    db.write()
    res.sendStatus(204)
})



// usersRouter.route("/hello").get(hello);

// apiRouter.use("/users", usersRouter);
// apiRouter.use("/test", userRouter);

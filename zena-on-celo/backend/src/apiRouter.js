import express from 'express';
import { db } from './database/db.js'
import { createWallet, getBalance, rewardBTC } from "./celoService.js";
import * as dotenv from 'dotenv'
dotenv.config()

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
    const wallet = await createWallet();
    console.log('address:', wallet.address)
    console.log('mnemonic:', wallet.mnemonic.phrase)
    console.log('privateKey:', wallet.privateKey)
    const newUser = {
        "id": db.data.users.length + 1,
        "name": userData.name,
        "email": userData.email,
        "pubKey": wallet.address,
        "privKey": wallet.privateKey,
        "stats": {
            "quiz1": 0,
            "quiz2": 0,
            "quiz3": 0,
            "quiz4": 0
        }
    }
    const newUsers = [...db.data.users, newUser];
    db.data.users = newUsers;
    db.write()
    res.send(newUser)

})


apiRouter.get('/users/:id', async (req, res) => {
    await db.read()
    const userId = req.params.id;
    const user = db.data.users?.find(user => user.id === parseInt(userId))
    res.send(user)
})

apiRouter.get('/users/:id/balance/:token', async (req, res) => {
    await db.read();
    const userId = req.params.id;
    const token = req.params.token;
    const user = db.data.users?.find(user => user.id === parseInt(userId))
    console.log(user)
    const balance = await getBalance(user.pubKey, token);
    res.send(balance)
})

apiRouter.post('/users/:id/reward', async (req, res) => {
    await db.read();
    const userId = req.params.id;
    const reward = req.body.reward;
    const user = db.data.users?.find(user => user.id === parseInt(userId))
    if (!reward) return res.send(400);
    const result = rewardBTC(user.pubKey, "0.01");
    if (result) return res.send(204);
})

apiRouter.put('/users/:id', async (req, res) => {
    await db.read()
    const userId = req.params.id;
    db.data.users = db.data.users?.map(user => {
        if (user.id === parseInt(userId)) {
            const userData = req.body.user;
            return userData;
        } else {
            return user
        }
    })
    db.write()
    res.sendStatus(204)
})

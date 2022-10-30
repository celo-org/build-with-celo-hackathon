const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const userRouter = require('./routes/user.route')


const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))


/**
 * API routes
 */
app.use('/api/user', userRouter)


module.exports = app
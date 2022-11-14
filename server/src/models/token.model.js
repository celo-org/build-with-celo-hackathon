const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, 
    },
})

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token;
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User;
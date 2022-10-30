const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const { signJwtToken } = require('../services/auth.service');
const { sendMail } = require('../services/sendMail.service');
const Token = require('../models/token.model')

async function signup(req, res) {
    const { fullName, email, password, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({ email })
        
        if(existingUser) return res.status(400).json({ message: "User already exists"})
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" })
        
        const hashedPassword = await bcrypt.hash(password, 12)
        
        const result = await User.create({ 
            fullName, 
            email, 
            password: hashedPassword 
        })
        
        sendMail(
            email, 
            "Verify Email", 
            { name: fullName, link: `http://localhost:3000/verify-email?user=${result._id}` }, 
            "../utils/templates/verifyEmail.handlebars"
        );

        res.status(201).json({ message: "Proceed to your email to verify your account" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "something went wrong"})
    }
}

async function verifyEmail(req, res) {
    const { _id } = req.body
    try {
        await User.findByIdAndUpdate(_id, { isVerified: true })
        res.status(200).json({ message: "Email verification successful!" });
    } catch (err) {
        res.status(500).json({ message: "Sorry an error occured" })
    }
}


async function login(req, res) {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        
        if(!existingUser) return res.status(404).json({ message: "User isn't registered" })
        
        if(!existingUser.isVerified) return res.status(404).json({ message: "This email isn't verified yet" })
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials"})
        
        const token = signJwtToken(existingUser._id, existingUser.email)
        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        return res.status(500).json({ message: "something went wrong" })
    }
}


async function getLoggedInUser(req, res) {
    try {
        const result = await User.findById(req.userID)
        if (!result) return res.status(404).json({ message: "user not found" })
        res.status(200).json(result)
        
    } catch (err) {
        return res.status(500).json({ message: "something went wrong" })
    }
}

async function updateUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.userID, req.body, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        console.log(err)
    }
}

async function forgotPassword(req, res) {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "User does not exist" })
        const token = await Token.findOne({ user: user._id })
        if (token) await token.deleteOne()
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 12)
        await Token.create({ token: hashedToken, user: user, createdAt: Date.now() })
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&userID=${user._id}`
        sendMail(user.email, "Password Reset Request", { name: user.name, link: resetLink }, "../utils/templates/resetPasswordRequest.handlebars");
        res.status(200).json({ result: 'success' });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "something went wrong" })
    }
}


async function resetPassword(req, res) {
    const { token, userID, password } = req.body

    try {
        const passwordResetToken = await Token.findOne({ user: userID.toString() })
        if (!passwordResetToken) return res.status(404).json({ message: "Invalid or expired token" })
        const isValidToken = await bcrypt.compare(token, passwordResetToken.token)
        if (!isValidToken) return res.status(400).json({ message: "Token is invalid" })
        const hashedPassword = await bcrypt.hash(password, 12)
        await User.findOneAndUpdate({ _id: userID }, { password: hashedPassword })
        await passwordResetToken.deleteOne();
        res.status(200).json({ result: 'successfully changed password' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'your request could not be processed' })
    }
}


module.exports = {
    signup,
    verifyEmail,
    login,
    getLoggedInUser,
    updateUser,
}
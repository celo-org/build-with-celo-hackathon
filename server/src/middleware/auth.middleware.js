const jwt = require('jsonwebtoken')

async function auth (req, res, next) {
    
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
            const decodedData = jwt.verify(token, process.env.JWT_SIGNATURE)
            req.userID = decodedData?.id
        }

        next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = {
    auth
};
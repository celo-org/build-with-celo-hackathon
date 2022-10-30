const jwt = require('jsonwebtoken')

function signJwtToken(id, email) {
    const token = jwt.sign({ id, email }, process.env.JWT_SIGNATURE, { expiresIn: "24h" })
    return token
}

module.exports = {
    signJwtToken
}
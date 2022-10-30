const validator = require('../services/validation.service')

function validateSignup(req, res, next) {
    const validationRule = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|string",
        password: "required|string",
        confirmPassword: "required|string"
    }
    validator(req.body, validationRule, res, next)
}

function validateLogin(req, res, next) {
    const validationRule = {
        email: "required|string",
        password: "required|string",
    }
    validator(req.body, validationRule, res, next)
}


module.exports = {
    validateSignup,
    validateLogin,
}
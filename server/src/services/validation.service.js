const Validator = require('validatorjs')


const validator = (body, rules, res, next, customMessages = {}) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => next());
    validation.fails(() => {
        res
            .status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: validation.errors
            });
    });
};

module.exports = validator
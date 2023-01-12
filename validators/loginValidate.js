//Check the login request data
const { check, validationResult } = require('express-validator');

const logInValidate = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!')
        .isEmail()
        .withMessage('Invalid email!'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password required!')
        .isLength({min: 8})
        .withMessage('Password length must from 8 charaters')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in password!'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({
                errors: errors.array()
            });
        next();
    }
]

module.exports =  logInValidate;
    
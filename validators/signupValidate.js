const { check, body,  validationResult } = require('express-validator');

//Check the signup request data
const signUpValidate = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username can not be empty!')
        .isLength({min: 6})
        .withMessage('Minimum 6 charaters required!'),
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
    check('information').optional(),
        check('information.fullname', 'Please enter a valid fullname')
            .if(body('information').exists())
            .not()
            .isEmpty(),
        check('information.gender', 'Please enter a valid gender')
            .if(body('information').exists())
            .isIn(['male', 'female', 'other']),
        check('information.age', 'User must be 18 years or older')
            .if(body('information').exists())
            .isInt({ min: 18 }),
        check('information.address', 'Please enter a valid address')
            .if(body('information').exists())
            .not()
            .isEmpty(),
        check('information.country', 'Please enter a valid country')
            .if(body('information').exists())
            .not()
            .isEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({
                errors: errors.array()
            });
        next();
    }
]

module.exports =  signUpValidate;
    
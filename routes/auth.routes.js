const express = require('express');
const signUpValidate  = require('../validators/signupValidate');
const loginValidate  = require('../validators/loginValidate');
const authController = require('../controllers/auth.controllers');
const router = express.Router();
//Sign up
router.post('/auth/signup', signUpValidate, authController.signup)
//Log in
router.post('/auth/login', loginValidate, authController.login)
//Sign out
router.post('/auth/signout', authController.signout)

module.exports = router;
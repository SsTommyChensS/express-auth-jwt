require('dotenv').config();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users.model');

exports.signup = async (req, res) => {
    const { username, email, password, information } = req.body;
    try {
        //Check if user existed
        let user = await userModel.findOne({
            email,
        });
        if(user) {
            return res.status(400).json({
                msg: 'User already exists!'
            });
        } else {
            user = new userModel({ username, email, password, information });
            //Hash password
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
        
            user.save();

            res.status(200).json({
                msg: 'Sign up successfully!'
            });
        }     
    } catch (error) {
        res.status(500).send('Error in saving!');
    }
}
//Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Check if email not existed
        let user = await userModel.findOne({
            email
        });
        if(!user) {
            return res.status(400).json({
                msg: 'User not exist!'
            });
        }
        //Compare password in body data with password in database
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                msg: 'Incorrect password!'
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        //Create a token with payload, assign secret key from .env
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: 3600
            },
            (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    token: token
                })
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}
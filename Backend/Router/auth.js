const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })
const jwt = require("jsonwebtoken")
const userdb = require('../models/User');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/User');


router.get('/', (req, res) => {
    res.send('hi from the Home page')
});



// FOR LOGIN OF EXISTING USERS

router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: 'Fill all the given fields Properly' });
    }

    try {
        const userLogin = await userdb.findOne({ Email: Email })
        if (!userLogin) {

            return res.status(409).json({ message: 'Invalid credentials' });
        } else {

            const isMatch = await bcrypt.compare(Password, userLogin.Password)


            const token = await userLogin.generateAuthToken();

            if (!isMatch) {
                return res.status(409).json({ message: 'Invalid credentials' });
            } else {
                return res.status(200).json({ message: 'login successfully', token: token });
            }
        }

    } catch (err) {
        console.log(err)
    }

})


module.exports = router

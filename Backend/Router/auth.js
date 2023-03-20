const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const userdb = require('../Models/user')
dotenv.config({ path: '../config.env' })
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const { emit } = require('../Models/user');


router.get('/', (req, res) => {
    res.send('hi from the Home page')
});

// For Registration of new user

router.post('/signUp', async (req, res) => {
    const { name,email,password  } = req.body;

    try {

        if (!name||!email||!password) {
            return res.status(400).json({ message: 'Fill all the given fields Properly' });
        }
        const userExists = await userdb.findOne({ email: email })
        if (userExists) {

            return res.status(409).json({ message: 'User already exists' });

        } else {

            const user = new userdb({ name,email,password })
            const userRgst = await user.save()
            console.log(user)

            if (userRgst) {
                return res.status(201).json({ message: 'User registered successfully' });

            }
        }

    } catch (err) {
        res.send(err);
    }
})

// FOR LOGIN OF EXISTING USERS

router.post('/login', async (req, res) => {
    const {email,password} = req.body;
    if (!email||!password) {
        return res.status(400).json({ message: 'Fill all the given fields Properly' });
    }

    try {
        console.log(email)


        const userLogin = await userdb.findOne({ email:email })
        if (!userLogin) {

            return res.status(409).json({ message: 'Invalid credentials' });
        } else {

            const isMatch = await bcrypt.compare(password, userLogin.password)


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


// day visit plan 

router.post('/dayVisitPlan',async(req,res)=>{
    
})

module.exports = router

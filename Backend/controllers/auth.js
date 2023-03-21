const { User } = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const bcrypt = require("bcryptjs");



exports.signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const { email, password } = req.body;
    console.log("signup req body ---", req);
    /* User.findOne({ email }, async (err, user) => {
        if (user) {
            return res.status(400).json({
                err: "User already exists",
            });
        }
        if (err) {
            return res.status(400).json({
                err: "something went wrong.",
            });
        }
        user = new User(req.body);

        const salt = await bcrypt.genSalt(10);
        //console.log('SALT',salt);
        user.password = await bcrypt.hash(password, salt);

        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    err: "NOT able to save user in DB",
                });
            }
            res.json({
                name: user.name,
                email: user.email,
                id: user._id,
            });
        });
    }); */

    User.findOne({ email })
        .then((user) => {
            console.log(user);
            if (user) {
                return res.status(400).json({
                    err: "User already exists",
                });
            }
        })
        .catch((err) => {
            console.error(err);
            if (err) {
                return res.status(400).json({
                    err: "something went wrong.",
                });
            }
        });

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    //console.log('SALT',salt);
    user.password = await bcrypt.hash(password, salt);
    
    user.save().then((user) => {
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    }).catch((err) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB",
            });
        }
    });
};

exports.signin = async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ error: "USER email does not exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ error: "Email and password do not match" });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
            },
        };
        //create token
        jwt.sign(
            payload,
            process.env.JWT_KEY,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;

                res.cookie("token", token, { expire: new Date() + 9999 });
                const { _id, name, email, role, avatar } = user;
                //put token in cookie
                return res.json({
                    token,
                    user: { _id, name, email, role, avatar },
                });
                //res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "sign-in error" });
    }
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully",
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.status(403).json({
            error: "You are not ADMIN, Access denied",
        });
    }
    next();
};

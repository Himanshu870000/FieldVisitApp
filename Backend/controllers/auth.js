const { User } = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const bcrypt = require("bcryptjs");
const Visit = require('../Models/Visit');



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
    console.log(email)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    try {
        console.log(email)
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




// create a new visit
exports.myVisit = (req, res) => {
  const visit = new Visit({
    visitDate: req.body.visitDate,
    visitorName: req.body.visitorName,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    geoLocation: req.body.geoLocation,
    user: req.body.user,
    dayVisitPlan: req.body.dayVisitPlan,
  });

  visit.save()
    .then(() => {
      res.status(201).send(visit);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Error creating visit' });
    });
};



exports.getVisitById = async (req, res) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization
        if(!token){
            return res.status(400).json({message:'Authorisation token is required'})
        }
        console.log(token)

        const decodedToken = jwt.decode(token)
console.log(decodedToken)
        const visitData =await Visit.find({user:decodedToken.user.id})
        console.log(visitData)
    return res.status(200).json(visitData)
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while retrieving the visit' });
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

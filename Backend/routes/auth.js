var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin,myVisit,getVisitById, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.post(
  "/myVisit",
  [
    check("visitDate", "visitDate is required").isLength({ min: 1 }),
    check("visitorName", "name field is required").isLength({ min: 1 }),
    check("street", "street field is required").isLength({ min: 1 }),
    check("city", "city field is required").isLength({ min: 1 }),
    check("state", "state field is required").isLength({ min: 1 }),
    check("country", "country field is required").isLength({ min: 1 }),
    check("phone", "phone field is required").isLength({ min: 1 }),
    check("status", "phone field is required").isLength({ min: 1 }),
    check("checkIn", "checkin field is required").isLength({ min: 1 }),
    check("checkOut", "checkOut field is required").isLength({ min: 1 }),

  ],
  myVisit
);

router.get('/visits', getVisitById);

router.get("/signout", signout);

module.exports = router;

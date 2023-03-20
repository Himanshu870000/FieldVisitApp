const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const validator = require("validator");
dotenv.config({path:'../config.env'})
const jwt = require("jsonwebtoken")
const userRegister = new mongoose.Schema({
 
    name:{
        type:String,
        required:true
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },


    password:{
        type:String,
        required:true,
    },


    otp:{
        type:String,
        default:null
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],

})

//To hash password

userRegister.pre('save',async function(next){
    console.log('hi from inside')
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
})


//To generate token

userRegister.methods.generateAuthToken = async function() {
    try {
      let token = jwt.sign(
        { _id: this._id },
        process.env.SECRET_KEY,
        { expiresIn: '30m' } // token will expire in 30 minutes
      );
      this.tokens = this.tokens.concat({ token });
      await this.save();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

const users = mongoose.model('User',userRegister);
module.exports = users;
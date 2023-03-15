const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const validator = require("validator");
dotenv.config({path:'../config.env'})
const jwt = require("jsonwebtoken")
const userRegister = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },

    LastName:{
        type:String,
        required:true
    },

    Email:{
        type: String,
        required: true,
        unique: true,
        validate(value) {
          if (!validator.isEmail(value)) {
              throw new Error("not valid email")
          }
      }

    },


    Password:{
        type:String,
        required:true,
    },

    passwordHint:{
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

userRegister.pre('save', async function(next) {
    const user = this;
  
    if (!user.isModified('Password')) {
      return next();
    }
  
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.Password, saltRounds);
      user.Password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });



//To generate token

userRegister.methods.generateAuthToken = async function  (){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){
        console.log(err)
    }
}

const users = mongoose.model('User',userRegister);
module.exports = users;
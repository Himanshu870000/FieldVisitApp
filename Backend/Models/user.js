var mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        biography: {
            type: String,
        },
        phone: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            /*validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }*/
        },
        password: {
            type: String,
            required: true,
            minLength: 7,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
        gcmToken: String,
        apnsToken: String,
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };

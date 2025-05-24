/* ye sabse phle create hoga i.e.. before user.controller.js and user.service.js aka ye sabse phle create hoga  */

/* Model (user.model.js)

This defines how your user data is stored in the database.

Includes the schema, password hashing methods, and validation rules. */



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
        type: String,
        required: true,
        minlength: [3, 'first name must be atleast 3 characters long'],
    },
    lastname: {
        type:String,
        minlength: [3, 'Last name should be atleast 3 characters'],
    },
},
    email: {
        type:String,
        required: true,
        unique: true,
        minlength: [5 , 'Email Should be atleasst 5 character long'],
    },
    password: {
        type: String,
        required: true,
        select: false,/* why we used select: false ----> You don’t want to expose the hashed password accidentally in API responses or in server logs. */
    },
    socketId: {
        type: String,
    },
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET , {expiresIn: '24h'});/* This generates a JWT token using the user's ID and a secret key. The token expires in 24 hours. */
    return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);/* This uses the bcrypt library to hash the provided password. */
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;


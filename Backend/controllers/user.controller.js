/* this file is createdd at last afet creating user.service.js and user.model.js  */


/* ✅ What it does:
Handles an HTTP POST request for user registration.

Validates input using express-validator.

Extracts user input from req.body.

Hashes the password before storing it.

Calls the Service to create the user.

Sends the response to the client. */


const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');



module.exports.registerUser = async (req, res, next) =>{

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}

//console.log(req.body);

const { fullname, email, password} = req.body;

const hashedPassword = await userModel.hashPassword(password);

const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
});


 const isUserAlreadyExist = await userModel.findOne({ email });
    if(isUserAlreadyExist){
        return res.status(400).json({ message: 'User already exists' });
    }

 const token = user.generateAuthToken();
    res.status(201).json({token, user });


}


module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    /* ✅ What This Code Does:
validationResult(req):

This line checks the request (req) for any validation errors based on your express-validator rules (like checking if the email is valid, password length, etc.).

if (!errors.isEmpty()):

This means if there are any validation errors (like missing email or short password), then...

return res.status(400).json({ errors: errors.array() });:

It sends a response to the client:

status(400) = Bad Request

json({ errors: [...] }) = An array of validation error messages

 */
 const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    /* userModel.findOne({ email })

Finds the first user in the database whose email matches the given value.

By default, the password field is not included because it has select: false in the schema.

.select('+password')

Overrides the select: false behavior.

Explicitly includes the password field in the result — usually to compare it with a login password using bcrypt. */

if(!user) {
    return res.status(401).json({message: 'Invalid email or password'});
}

 const isMatch = await user.comparePassword(password);
 
 if(!isMatch) {
    return res.status(401).json({message: 'Invalid email or password'});
 }
 
 const token = user.generateAuthToken();
 res.cookie('token', token);    
 res.status(200).json({token, user})/* ✅ 1. Why do we use generateAuthToken()?
This creates a JWT (JSON Web Token).

It's used to authenticate the user in future requests without requiring them to log in again every time.

Once the user logs in successfully, they get this token, which they store (e.g., in localStorage or cookies).

 */

}
 
 
module.exports.getUserProfile = async (req, res, next ) =>{
  /* jo ek profile page hota hai vo ek particular user ko he dikhta hai jis user ne login kiya tha ussi user ko uska profile page dikhna chaiye abb iss operation ko perfrom karane ke liye hum loog ek middleware banate hai vo middleware humein auth.middleware.js me create kiya hai */
  res.status(200).json({user: req.user})
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    
    await blacklistTokenModel.create({ token });
    
    res.status(200).json({ message: 'Logged out successfully' });
}






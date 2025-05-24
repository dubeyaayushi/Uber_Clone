/* this file is created after creating the captain.model.js and after creating the captain.controller.js we will create the model  */

const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator')/* this is used to check if the validation is passed or not. */
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {


    const errors = validationResult(req);/* this is used to check if the validation is passed or not. */
     
    //if data is wrong send this 
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });/* this is used to check if the validation is passed or not. */
    }

    //if data is correct send this
    const { fullname, email, password, vehicle } = req.body;/* this is used to get the data from the request body. */

    const isCaptainAlreadyExist = await captainModel.findOne({ email });/* this is used to check if the captain already exists or not. */
     
    if(isCaptainAlreadyExist){
        return res.status(400).json({ message: 'Captain already exists' });/* this is used to check if the captain already exists or not. */
    }



    const hashedPassword = await captainModel.hashPassword(password);/* this is used to hash the password. */
    
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();/* this is used to generate the token. */

    res.status(201).json({ token , captain});/* this is used to send the response. */ 




}


module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);/* this is used to check if the validation is passed or not. */
     
    //if data is wrong send this 
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });/* this is used to check if the validation is passed or not. */
    }

    //if data is correct send this
    const { email, password } = req.body;/* this is used to get the data from the request body. */

    const captain = await captainModel.findOne({ email }).select('+password');/* this is used to find the captain by email. */

    if(!captain){
        return res.status(400).json({ message: 'Invalid email or password' });/* this is used to check if the captain already exists or not. */
    }

    const  isMatch = await captain.comparePassword(password);/* this is used to compare the password. */

    if(!isMatch){
        return res.status(400).json({ message: 'Invalid email or password' });/* this is used to check if the captain already exists or not. */
    }

    const token = captain.generateAuthToken();/* this is used to generate the token. */

    res.cookie('token', token );/* this is used to set the cookie. */
    res.status(200).json({ token , captain});/* this is used to send the response. */
}



module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });/* this is used to send the response. */ 
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];/* this is used to get the token from the request. */

    await blacklistTokenModel.create({ token });/* this is used to create the token in the blacklist. */
    res.clearCookie('token');/* this is used to clear the cookie. */
    res.status(200).json({ message: 'Logged out successfully' });/* this is used to send the response. */
}


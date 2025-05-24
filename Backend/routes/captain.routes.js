const express = require('express');
const captainController = require('../controllers/captain.controller');/* this file is created after creating the captain.model.js and after creating the captain.controller.js we will create the model  */
const router = express.Router();    

const authMiddleware = require('../middlewares/auth.middleware');


const { body } = require('express-validator');/* ✅ req.body → is the actual data sent by the client (e.g., form or JSON data).

✅ body from express-validator → is a function used to validate specific fields inside req.body. */


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
,
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color name must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate name must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
   body('vehicle.vehicleType').isIn([ 'bike', 'car' , 'auto' ]).withMessage('Vehicle type must be at least 3 characters long'),
],
  captainController.registerCaptain
)


  router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], 
  captainController.loginCaptain) //we wiill creaste this captainconttrollerr in the captain.controller.js file

  router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile); //we will create this captain controller in the captain.controller.js file
  
  router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain); //we will create this captain controller in the captain.controller.js file
 
  module.exports = router;


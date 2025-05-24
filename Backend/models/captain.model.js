/* when starting to create things for captain sabse phle m=humein ye captain ka model banaya tha i.e.. in the begining start yahi se hui the abb iske baad hum captain ka controller banayenge  */

/* captain is bascially driver in the uber just like we create the user we are now gonna create the captain id in the seprately  

captain vaisa he create hoga jaisa user but yaha pe captain ke pass 2 cheez extra hogi i.e...
1) socket Id
2) is he available or not 
*/


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// Define the Captain schema
const bcrypt = require('bcrypt');/* This is used for hashing passwords. */  
const captainSchema = new mongoose.Schema({

 fullname: {
     firstname: {
         type: String,
         required: true,
         minlength: [3, 'first name must be atleast 3 characters long'],
     },
     lastname: {
         type: String,
         required: true,
         minlength: [3, 'Last name should be atleast 3 characters'],
     },
 },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
       match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Don't return password by default
    },

    /*socketId: {
        type: String,
        required: true,
    },*/

   status: {
       type: String,
       enum: ['active', 'inactive'],
       default: 'inactive',
   },

   vehicle :{
    color: {
        type: String,
        required: true,
        minlength: [3, 'color name should be atleast 3 characters'],
    },
    plate: {
        type: String,
        required: true,
        //unique: true,
        minlength: [3, 'plate name should be atleast 3 characters'],
    },
    capacity:{
        type: Number,
        required: true,
        min: [1, 'capacity should be atleast 1'],                                                       
    }
   },

   vehicleType: {
       type: String,
       required: true,
       enum: ['bike', 'car' , 'auto' ],
        
   },
  location: {
        lat:{
            type: Number,
        },
        lng: {
            type: Number,
        }
}

})


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET , {expiresIn: '24h'});/* This generates a JWT token using the user's ID and a secret key. The token expires in 24 hours. */
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // This compares the provided password with the hashed password stored in the database. If they match, it returns true; otherwise, false.
  /* This uses the bcrypt library to hash the provided password. */
}   

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);/* This uses the bcrypt library to hash the provided password. */
}

const captainModel = mongoose.model('captain', captainSchema);
// This creates a Mongoose model named 'captain' based on the captainSchema.
// This model will be used to interact with the 'captains' collection in the MongoDB database.

module.exports = captainModel;// This exports the captainModel so it can be used in other parts of the application.
// This exports the userModel so it can be used in other parts of the application.  

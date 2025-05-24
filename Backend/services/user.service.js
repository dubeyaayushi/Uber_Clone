/* after user.model.js this is created that is user.service is created after cereating user.model.js */


/* ✅ What it does:
Checks if firstname, email, or password are missing.

Calls the Mongoose model to create a new user in the database.

Organizes data structure: nests firstname and lastname under fullname. */


const userModel = require('../models/user.model');


module.exports.createUser = async ({
    firstname , lastname, email, password
}) => {
    if(!firstname || !email || !password) {
        throw new Error('ALl fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        }, 
        email, 
        password
    })
    return user
}





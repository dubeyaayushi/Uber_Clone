const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}









/* This code defines authentication middleware functions for verifying the identity of users and captains in a Node.js Express backend using JWT (JSON Web Tokens) and token blacklisting.

🔐 What It Does (in short):
authUser: Authenticates normal users.

authCaptain: Authenticates captains (drivers).

Both:

Extract the token from cookies or the Authorization header.

Check if the token is blacklisted (i.e., logged out or invalidated).

Decode the token using jwt.verify() to get the user/captain's ID.

Fetch the user/captain from the database.

Attach the user/captain to the req object (req.user or req.captain).

Call next() to allow access to protected routes.

If anything fails → send 401 Unauthorized.

🛠️ Why It's Needed
These functions are used to protect private routes (like /user/profile, /captain/home) to:

Ensure only logged-in users can access sensitive data.

Prevent access by invalid, expired, or logged-out tokens (using blacklist).

🧠 How It Works (Step-by-Step)
Token Extraction:

js
Copy
Edit
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
Looks in cookies or headers (Bearer token) for the JWT.

Check for Missing Token:

js
Copy
Edit
if (!token) return res.status(401)
Check if Token is Blacklisted:

js
Copy
Edit
const isBlacklisted = await blackListTokenModel.findOne({ token });
If found → deny access.

Verify Token and Get User/Captain:

js
Copy
Edit
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await userModel.findById(decoded._id); // or captainModel
Attach to Request:

js
Copy
Edit
req.user = user; // or req.captain = captain
next();
Fail Gracefully:

If any error (invalid token, expired, etc.) → return 401 Unauthorized. */
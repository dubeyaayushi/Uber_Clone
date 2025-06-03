const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: [ 'pending', 'accepted', "ongoing", 'completed', 'cancelled' ],
        default: 'pending',
    },

    duration: {
        type: Number,
    }, // in seconds

    distance: {
        type: Number,
    }, // in meters

    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },

    otp: {
        type: String,
        select: false,
        required: true,
    },
})

module.exports = mongoose.model('ride', rideSchema);






/* This code defines the MongoDB schema for a ride in a ride-booking app (like Uber) using Mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js.

🔧 What the code does:
js
Copy
Edit
const rideSchema = new mongoose.Schema({...});
It defines the structure of a "ride" document in MongoDB: what fields a ride should have, their types, whether they are required, etc.

js
Copy
Edit
module.exports = mongoose.model('ride', rideSchema);
This creates a Mongoose model called 'ride' based on the schema, so you can perform operations like .find(), .create(), .updateOne() on the "rides" collection in MongoDB.

📦 Why we need it:
It ensures data consistency — all rides must follow this structure.

It simplifies CRUD operations (Create, Read, Update, Delete).

It supports relationships (like linking users and captains via ObjectIds).

It allows you to define defaults, enums, required fields, and field types.

🧱 Explanation of Each Field:
Field	Type	Purpose
user	ObjectId	References the user who booked the ride (ref: 'user')
captain	ObjectId	References the captain (driver) who accepted the ride
pickup	String	The pickup location address
destination	String	The destination location address
fare	Number	The ride fare
status	String	Status of the ride (pending, accepted, etc.)
duration	Number	Duration of the ride in seconds
distance	Number	Distance in meters
paymentID, orderId, signature	String	Related to online payment info
otp	String	Used to verify ride start/end. Marked select: false so it won't be returned in queries unless explicitly asked for. */
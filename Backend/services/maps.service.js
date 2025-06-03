const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            /* This line:
 
const location = response.data.results[0].geometry.location;
is extracting latitude and longitude coordinates from the response of a Google Maps Geocoding API call.

🔍 Context:
This line comes from code that looks like this:

const response = await axios.get(url);
if (response.data.status === 'OK') {
    const location = response.data.results[0].geometry.location;
}
🧠 What It Does:
response.data → is the JSON data returned by Google Maps API.

results[0] → gets the first result (best match for the address).

.geometry.location → contains the latitude and longitude of that result. */
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
/* 
✅ Purpose
getAddressCoordinate(address)
→ Given a string address like "Taj Mahal, India"
→ Returns: { ltd: 27.1751, lng: 78.0421 }



API Call:
js
Copy
Edit
const response = await axios.get(url);
Makes a GET request to the Google Maps Geocoding API.

await waits for the response to come back.




Handling the Response:
js
Copy
Edit
if (response.data.status === 'OK') {
    const location = response.data.results[0].geometry.location;
    return {
        ltd: location.lat,
        lng: location.lng
    };
}
Checks if the response is valid.

Extracts the latitude and longitude from the first result.


 */
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}
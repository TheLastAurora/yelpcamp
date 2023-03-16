const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Location = require('../models/Location');
const _ = require('lodash');

dotenv.config();

const MapboxClient = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = MapboxClient({ accessToken: process.env.MAPBOX_TOKEN });

class Valid {
    validateLocation(req, res, next) {
        const { country, city, state, zipCode, address } = req.body;
        const addressQuery = `${city}, ${state}, ${zipCode}, ${country}`;
        geocodingClient.forwardGeocode({
            query: addressQuery,
            limit: 1
        }).send()
            .then(response => {
                const feature = response.body.features[0];
                if (!feature) {
                    return res.status(400).send('Location not found');
                }
                const [city, state, country] = feature.place_name.split(',');
                req.body.location = {
                    country: country.trim(),
                    city: city,
                    state: state,
                    address: address,
                    zipCode: feature.context[0].id.split('.').pop(),
                    longitude: feature.center[0],
                    latitude: feature.center[1],
                };
                delete req.body.country;
                delete req.body.city;
                delete req.body.state;
                delete req.body.zipCode;
                delete req.body.address;
                next();
            })
            .catch(error => res.status(500).send('Server error'));
    };

    validateDetails(req, res, next) {
        const { name, capacity, price, rules, description } = req.body;
        if (0 >= name.length  > 120 || 0 >= parseInt(capacity) < 99999 || 0 >= parseInt(price) > 999999 || 0 >= rules.length  > 1000 || 0 >= description > 2000) {
            return next();
        }
        return res.status(400).send('Missing details');
    };
};



module.exports = new Valid();
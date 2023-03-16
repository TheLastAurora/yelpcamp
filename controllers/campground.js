const connection = require('../database/connection');
const Auth = require('../middleware/auth');
const Campground = require('../models/Campground');
const Content = require('../models/Content');
const getData = require('../services/getData');
const Location = require('../models/Location');
const jwt = require('jsonwebtoken');


// CAMPGROUNDS //

module.exports.renderCampgrounds = async (req, res) => {
    const content = await getData.getCampgroundContent();
    const campground  = await getData.getUserCampgrounds();
    res.render('campgrounds', { user: req.user, content, campground });
};

// CAMPGROUND (ID) //

module.exports.renderCampground = async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await getData.getCampground(id);
        const content = await getData.getCampgroundContent(id);
        const links = [];
        for (let i = 0; i < content.length; i++) {
            links.push(content[i].link);
        }
        res.render('campground', { campground, links });
    }
    catch (error) {
        res.status(404).send('CAMPGROUND NOT FOUND');
    }
};

// ADD CAMPGROUND //

module.exports.renderAddCampground = (req, res) => {
    res.render('add-campground', { user: req.user });
};

module.exports.addCampground = async (req, res) => {
    const { name, capacity, price, rules, description, location: { latitude, longitude, address, city, state, zipCode: zip_code, country } } = req.body;
    try {
        const location = await Location.create({ latitude, longitude, address, city, state, zip_code, country }).catch((err) => console.log(err));
        const campground = await Campground.create({ name, capacity, price, rules, description, location_fk: location.id, user_fk: req.user.id });
        for (let i = 0; i < req.body.campFiles.length; i++) {
            let content = await Content.create({ link: req.body.campFiles[i].Location, campground_fk: campground.id });
        }
    }
    catch (error) {
        res.status(403).send('INVALID ADDRESS');
    }
    return res.status(200).send('CAMPGROUND ADDED');
};


// DELETE CAMPGROUND //

module.exports.deleteCampground = (req, res) => {
    const { id } = req.params;
    try {
        Campground.destroy({ where: { id } });
    }
    catch (error) {
        res.status(404).send('CAMPGROUND NOT FOUND');
    }
};


// UPDATE CAMPGROUND //

module.exports.updateCampground = (req, res) => {
    const { id } = req.params;
    const { name, capacity, price, rules, description, location: { latitude, longitude, address, city, state, zip_code, country } } = req.body;
    try {
        Campground.update({ name, capacity, price, rules, description }, { where: { id } });
    }
    catch (error) {
        res.status(403).send('ERROR AT UPDATE');
    }
};

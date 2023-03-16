const connection = require('../database/connection');
const Campground = require('../models/Campground');
const Location = require('../models/Location');
const Content = require('../models/Content');
const User = require('../models/User');

module.exports.getCampground = async (id) => {
    try {
        const campground = await Campground.findByPk(id);
        return campground;
    } catch (error) {
        return null;
    }
};

module.exports.getUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    }
    catch (error) {
        return null;
    }
};

module.exports.getCountries = () => {
    let countries = Location.getAttributes().country.type.values;
    return countries;
};

module.exports.getCampgroundContent = async (id) => {
    try {
        const content = id ? await Content.findAll({ where: { campground_fk: id } }) : await Content.findAll();
        return content;
    }
    catch (error) {
        return null;
    }
};

module.exports.getUserCampgrounds = async (id) => {
    try {
        const campgrounds = id ? await Campground.findAll({ where: { user_fk: id }, order: [['rating', 'DESC']] }) : await Campground.findAll({ order: [['rating', 'DESC']] });
        const [[{ avgRating }]] = id ? await connection.query(`SELECT ROUND(AVG(rating), 1) AS avgRating FROM campground WHERE user_fk = ${id}`) : [[{ null: null }]];
        return id ? { campgrounds, avgRating } : campgrounds;
    }
    catch (error) {
        return null, null;
    }
};
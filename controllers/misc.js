const connection = require('../database/connection');
const Auth = require('../middleware/auth');
const getData = require('../services/getData');
const User = require('../models/User');


module.exports.renderHome = async (req, res) => {
    res.render('home', { user: req.user });
};

module.exports.renderAbout = async (req, res) => {
    res.render('about', { user: req.user });
};

module.exports.renderContact = async (req, res) => {
    res.render('contact', { user: req.user });
};

module.exports.renderPolicy = async (req, res) => {
    res.render('policy', { user: req.user });
};

module.exports.renderNews = async (req, res) => {
    res.render('news', { user: req.user });
};

module.exports.renderSupport = async (req, res) => {
    res.render('support', { user: req.user });
};
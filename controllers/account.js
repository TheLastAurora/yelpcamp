const connection = require('../database/connection');
const Auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const getData = require('../services/getData');
const jwt = require('jsonwebtoken');


// REGISTER // 

module.exports.renderRegister = async (req, res) => {
    res.render('register');
};

module.exports.addUser = async (req, res) => {
    try {
        const { first_name, last_name, birth_date, email, phone, password } = req.body;

        if (!await User.findOne({ where: { email } })) {
            const hashed = await bcrypt.hash(password, 13);
            const user = await User.create({ first_name, last_name, birth_date, email, phone, password: hashed });
            res.redirect('/accounts/login');
        }
        else {
            res.render('register', { emailExists: true })
        }
    }
    catch (error) {
        res.status(403).send('ERROR AT ADD');
    };
}


// LOGIN // 

module.exports.renderLogin = (req, res) => {
    res.render('login');
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (email) {
        try {
            const user = await ((await User.findOne({ where: { email } })).dataValues);
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = await Auth.generateToken(user.id);
                res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                return res.redirect(`/accounts/profile/${user.id}`);
            }
        }
        catch (err) {
            return res.render('login', { auth: false });
        }
    }   
    return res.render('login', { auth: false });
};


// PROFILE //


module.exports.renderProfile = async (req, res) => {
    try {
        const { user, auth } = await Auth.authType(req);
        const {campgrounds, avgRating} = await getData.getUserCampgrounds(user.id);
        return res.render('profile', { user, auth, campgrounds, avgRating });
    }
    catch (error) {
        return res.status(404).send('USER DOES NOT EXIST');
    }
};


// LOGOUT //

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
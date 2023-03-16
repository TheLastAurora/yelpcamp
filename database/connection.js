const Sequelize = require('sequelize');
const mysql = require('mysql2');
const dbConfig = require('../config/config');


const connection = new Sequelize(dbConfig[process.env.NODE_ENV]);

const User = require('../models/User');
const Location = require('../models/Location');
const Campground = require('../models/Campground');
const Content = require('../models/Content');


User.init(connection);
Location.init(connection);
Campground.init(connection);
Content.init(connection);

module.exports = connection;
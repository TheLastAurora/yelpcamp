const express = require('express');
const router = express.Router();
const accounts = require('../controllers/account');
const Auth = require('../middleware/auth');


router.route('/register').get(accounts.renderRegister);
router.route('/register').post(accounts.addUser);

router.route('/login').get(accounts.renderLogin);
router.route('/login').post(accounts.loginUser);

router.route('/logout').get(Auth.verifyToken, accounts.logoutUser);

router.route('/profile/:id').get(Auth.verifyToken, accounts.renderProfile);


module.exports = router;
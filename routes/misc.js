const express = require('express');
const router = express.Router();
const misc = require('../controllers/misc');
const Auth = require('../middleware/auth');

router.route('/').get(Auth.verifyToken, misc.renderHome);
router.route('/support').get(Auth.verifyToken, misc.renderSupport);
router.route('/policy').get(Auth.verifyToken, misc.renderPolicy);
router.route('/news').get(Auth.verifyToken, misc.renderNews);
router.route('/contact').get(Auth.verifyToken, misc.renderContact);
router.route('/about').get(Auth.verifyToken, misc.renderAbout);




module.exports = router;
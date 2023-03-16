const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campground');
const Auth = require('../middleware/auth');
const Valid = require('../middleware/valid');
const Upload = require('../middleware/upload');


router.route('/').get(Auth.verifyToken ,campgrounds.renderCampgrounds);

router.route('/new').get(Auth.verifyToken, campgrounds.renderAddCampground);
router.route('/new').post(Auth.verifyToken, Upload.uploadFiles, Valid.validateLocation, Valid.validateDetails, campgrounds.addCampground);


router.route('/:id').get(campgrounds.renderCampground);
router.route('/:id').delete(Auth.verifyToken, campgrounds.deleteCampground);
router.route('/:id').post(Auth.verifyToken, campgrounds.updateCampground);

module.exports = router;
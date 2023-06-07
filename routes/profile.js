const express = require('express');

const router = express.Router();
const profileController = require('../controllers/profile');

router.post('/profiles', profileController.createProfile);
router.get('/profiles', profileController.getProfile);
router.post('/profiles/bodies', profileController.createBodyProfile);
router.get('/profiles/bodies', profileController.getBodyProfiles);

module.exports = router;

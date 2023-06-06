const express = require('express');

const router = express.Router();
const profileController = require('../controllers/profile');

router.post('/profiles', profileController.createProfile);
router.get('/profiles', profileController.getProfile);

module.exports = router;

const express = require('express');

const authentication = require('../middlewares/authentication');
const authRoutes = require('./auth');
const exercisesRoutes = require('./exercise');

const router = express.Router();
const bodypartRoutes = require('./bodypart');
const profileRoutes = require('./profile');

router.use('/pub', authRoutes);

router.use('/pub', authentication);
router.use('/pub', profileRoutes);
router.use('/pub', exercisesRoutes);

router.use('/pub', bodypartRoutes);

module.exports = router;

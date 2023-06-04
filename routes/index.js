const express = require('express');

const authentication = require('../middlewares/authentication');
const authRoutes = require('./auth');
const exercisesRoutes = require('./exercise');

const router = express.Router();

router.use('/pub', authRoutes);

router.use('/pub', authentication);
router.use('/pub', exercisesRoutes);

module.exports = router;

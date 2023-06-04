const express = require('express');
const registerRoutes = require('./auth');

const router = express.Router();
const bodypartRoutes = require('./bodypart');

router.use('/pub', registerRoutes);

router.use('/pub', bodypartRoutes);

module.exports = router;

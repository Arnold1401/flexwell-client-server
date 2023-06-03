const express = require('express');
const registerRoutes = require('./auth');

const router = express.Router();

router.use('/pub', registerRoutes);

module.exports = router;

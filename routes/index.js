const express = require('express');

const router = express.Router();
const bodypartRoutes = require('./bodypart')

router.use("/pub", bodypartRoutes)

module.exports = router;
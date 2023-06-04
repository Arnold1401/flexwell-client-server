const express = require('express');
const registerRoutes = require('./auth');

const router = express.Router();
const Controller = require("../controllers/gymsController");

router.get("/pub/bodyparts/", Controller.allBodyParts);
router.get("/pub/bodyparts/:id", Controller.getBodyPartsById);

router.use('/pub', registerRoutes);

module.exports = router;

const express = require('express');

const router = express.Router();
const bodyPartController = require('../controllers/bodypart');

router.get('/bodyparts', bodyPartController.allBodyParts);
router.get('/bodyparts/:id', bodyPartController.getBodyPartsById);

module.exports = router;

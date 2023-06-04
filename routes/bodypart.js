const express = require('express');

const router = express.Router();
const BodyPartController = require('../controllers/bodypart');

router.get('/bodyparts', BodyPartController.allBodyParts);
router.get('/bodyparts/:id', BodyPartController.getBodyPartsById);

module.exports = router;

const express = require('express');
const exerciseController = require('../controllers/exercise');

const router = express.Router();

router.get('/exercises', exerciseController.getExercises);

module.exports = router;

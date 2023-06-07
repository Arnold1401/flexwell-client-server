const express = require('express');
const exerciseController = require('../controllers/exercise');

const router = express.Router();

router.get('/exercises', exerciseController.getExercises);
router.post('/exercises', exerciseController.createExercise);
router.get('/exercises/:id', exerciseController.getExerciseDetailById);
router.delete('/exercises/:id', exerciseController.deleteExerciseById);
router.post('/exercises/:id/details', exerciseController.createExerciseDetails);
router.post('/exercises/:id/activities', exerciseController.createExerciseActivity);

module.exports = router;

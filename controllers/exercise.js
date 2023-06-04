/* eslint-disable no-param-reassign */
const { Op } = require('sequelize');
const { Exercise, Activity, ExerciseDetail } = require('../models');

class AuthController {
  static async getExercises(req, res, next) {
    try {
      const { type } = req.query;

      const exerciseQuery = {
        raw: true,
        attributes: ['id', 'name'],
      };
      if (type === 'Challenge') {
        exerciseQuery.where = {
          type,
        };
      } else {
        exerciseQuery.where = {
          type: 'Exercise',
        };
      }

      const exercises = await Exercise.findAll(exerciseQuery);

      const exerciseIds = exercises.map((exercise) => exercise.id);

      const exerciseDetailQuery = {
        where: {
          exerciseId: {
            [Op.in]: exerciseIds,
          },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      };

      const exerciseDetails = await ExerciseDetail.findAll(exerciseDetailQuery);

      const activityQuery = {
        where: {
          exerciseId: {
            [Op.in]: exerciseIds,
          },
          userId: req.user.id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      };

      const activities = await Activity.findAll(activityQuery);

      exercises.forEach((ex) => {
        const activity = activities.find((act) => act.exerciseId === ex.id);
        const exerciseDetail = exerciseDetails.filter((exc) => exc.exerciseId === ex.id);
        ex.exercises = exerciseDetail || null;
        ex.activity = activity || null;
        const totalSet = AuthController.generateTotalSet(exerciseDetail);
        ex.totalSet = totalSet
        ex.totalDuration = AuthController.generateTotalDuration(totalSet);
      });

      res.json(exercises);
    } catch (error) {
      next(error);
    }
  }

  static async getExerciseDetailById(req, res, next) {
    try {
      const { id } = req.params;

      let exercise = await Exercise.findOne({
        include: {
          model: ExerciseDetail,
          as: 'exercises',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
        where: {
          id,
        },
      });

      const activity = await Activity.findOne({
        where: {
          exerciseId: exercise.id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      exercise = exercise.toJSON();
      exercise.activity = activity || null;
      res.json(exercise);
    } catch (error) {
      next(error);
    }
  }

  static generateTotalSet(exerciseDetail) {
    const totalSets = exerciseDetail.map((ex) => ex.totalSet);
    return totalSets.length ? totalSets.reduce((total, num) => total + num) : 0;
  }

  static generateTotalDuration(totalSet) {
    return Math.round(totalSet * 3.5);
  }
}

module.exports = AuthController;

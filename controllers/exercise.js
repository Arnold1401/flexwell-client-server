const { Op } = require('sequelize');
const { Exercise, Activity } = require('../models');

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
      const activityQuery = {
        where: {
          exerciseId: {
            [Op.in]: exerciseIds,
          },
          userId: req.user.id,
        },
      };

      const activities = await Activity.findAll(activityQuery);

      exercises.forEach((ex) => {
        const activity = activities.find((act) => act.exerciseId === ex.id);
        // eslint-disable-next-line no-param-reassign
        ex.activity = !activity ? null : activity;
      });

      res.json(exercises);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

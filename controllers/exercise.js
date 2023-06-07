/* eslint-disable no-param-reassign */
const { Op } = require('sequelize');
const {
  Exercise, Activity, ExerciseDetail, ActivityDetail, sequelize,
} = require('../models');

class ExerciseController {
  static async getExercises(req, res, next) {
    try {
      const { type } = req.query;
      const { id: userId } = req.user;

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
          userId,
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
        const totalSet = ExerciseController.generateTotalSet(exerciseDetail);
        ex.totalSet = totalSet;
        ex.totalDuration = ExerciseController.generateTotalDuration(totalSet);
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

      if (!exercise) {
        throw { name: 'Data not found' };
      }

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

  static async createExercise(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { name } = req.body;
      const exercise = await Exercise.create({ name, userId, type: 'Exercise' });

      res.status(201).json({ message: `Exercise with id ${exercise.id} created successfully`, id: exercise.id });
    } catch (error) {
      next(error);
    }
  }

  static async deleteExerciseById(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const exercise = await Exercise.findOne({ where: { id, type: 'Exercise' } });
      if (!exercise) throw { name: 'Data not found' };
      if (exercise.userId !== userId) throw { name: 'You are not authorized' };
      await Exercise.destroy({
        where: { id },
      });

      res.status(200).json({ message: `id ${id} successfuly deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async createExerciseDetails(req, res, next) {
    try {
      const { id: exerciseId } = req.params;
      const { exerciseDetails } = req.body;
      const { id: userId } = req.user;

      const exercise = await Exercise.findByPk(exerciseId);
      if (!exercise) {
        throw { name: 'Data not found' };
      }

      if (exercise.userId !== userId) throw { name: 'You are not authorized' };

      const mappedExerciseDetails = exerciseDetails.map(({
        name, bodyPart, bodyPartId, gifUrl, totalSet, repetition, weight,
      }) => ({
        name, bodyPart, bodyPartId, gifUrl, totalSet, repetition, weight, exerciseId,
      }));

      await ExerciseDetail.bulkCreate(mappedExerciseDetails);

      res.status(201).json({ message: 'exerciseDetails successfully added' });
    } catch (error) {
      next(error);
    }
  }

  static async createExerciseActivity(req, res, next) {
    try {
      const {
        totalSet, repetition, duration, weight, exerciseDetailId,
      } = req.body;
      const { id: userId } = req.user;
      const { id: exerciseId } = req.params;

      await sequelize.transaction(async (t) => {
        function upsert(values, condition) {
          return Activity
            .findOne({ where: condition, transaction: t })
            .then((obj) => {
              // update
              if (obj) {
                obj.update({ ...obj, duration: +obj.duration + +duration });
                return obj;
              }
              // insert
              return Activity.create(values, { transaction: t });
            });
        }
        const activity = await upsert({
          duration, status: 'Finished', exerciseId, userId, date: new Date(),
        }, { exerciseId, userId });

        const activityDetail = await ActivityDetail.create({
          totalSet, repetition, duration, status: 'Finished', weight, userId, activityId: activity.id, exerciseDetailId,
        }, { transaction: t });

        return activityDetail;
      });

      res.status(201).json({ message: `Activity of exercise with id ${exerciseId} created successfully` });
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

module.exports = ExerciseController;

/* istanbul ignore file */
const { Exercise } = require('../models');

class ExercisesTableTestHelper {
  static addExcercises(exercises) {
    return Exercise.bulkCreate(exercises);
  }

  static cleanTable() {
    return Exercise.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = ExercisesTableTestHelper;

/* istanbul ignore file */
const { ExerciseDetail } = require('../models');

class ExerciseDetailsTableTestHelper {
  static addExcerciseDetails(exerciseDetails) {
    return ExerciseDetail.bulkCreate(exerciseDetails);
  }

  static cleanTable() {
    return ExerciseDetail.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = ExerciseDetailsTableTestHelper;

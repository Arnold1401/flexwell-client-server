/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ExerciseDetail, { foreignKey: 'exerciseId', as: 'exercises' });
    }
  }
  Exercise.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required',
        },
        notNull: {
          msg: 'Name is required',
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Exercise',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};
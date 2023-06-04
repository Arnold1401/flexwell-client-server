/* istanbul ignore file */
/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExerciseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExerciseDetail.init({
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
    bodyPartId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'bodyPartId is required',
        },
        notNull: {
          msg: 'bodyPartId is required',
        },
      },
    },
    bodyPart: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'bodyPart is required',
        },
        notNull: {
          msg: 'bodyPart is required',
        },
      },
    },
    set: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'set is required',
        },
        notNull: {
          msg: 'set is required',
        },
      },
    },
    repetition: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'repetition is required',
        },
        notNull: {
          msg: 'repetition is required',
        },
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'exerciseId is required',
        },
        notNull: {
          msg: 'exerciseId is required',
        },
      },
      references: {
        model: 'Exercises',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  }, {
    sequelize,
    modelName: 'ExerciseDetail',
  });
  return ExerciseDetail;
};
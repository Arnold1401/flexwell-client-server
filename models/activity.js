/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activity.init({
    status: {
      type: DataTypes.ENUM({
        values: ['Finished', 'Unfinished'],
      }),
<<<<<<< HEAD
      allowNull: false,
=======
      allowNull: true,
>>>>>>> create-testing
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Exercises',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};
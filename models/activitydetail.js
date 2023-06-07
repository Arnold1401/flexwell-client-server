/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityDetail.init({
    totalSet: DataTypes.INTEGER,
    repetition: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    activityId: DataTypes.INTEGER,
    exerciseDetailId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ActivityDetail',
  });
  return ActivityDetail;
};

/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BodyProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BodyProfile.init({
    biceps: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    waist: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    chest: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    shoulder: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    thigh: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    calf: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
    date: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Input data type must be an integer'
        }
      },
    },
  }, {
    sequelize,
    modelName: 'BodyProfile',
  });
  return BodyProfile;
};
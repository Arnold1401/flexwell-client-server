/* eslint-disable */
'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username must be unique'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required',
        },
        notNull: {
          msg: 'Username is required',
        },
        is: {
          args: /^[\w]+$/,
          msg: 'Username contain restricted character'
        },
        len: {
          args: [2,50],
          msg: 'Password must have length between 2 and 50'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required',
        },
        notNull: {
          msg: 'Email is required',
        },
        isEmail: {
          msg: 'Invalid email format',
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required',
        },
        notNull: {
          msg: 'Password is required',
        },
        len: {
          args: [6,20],
          msg: 'Password must have length between 6 and 20'
        },
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [2,20],
          msg: 'FullName must have length between 2 and 20'
        },
      },
    },
    gender: {
      type: DataTypes.ENUM({
        values: ['Male', 'Female'],
      }),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM({
        values: ['Client', 'Admin'],
      }),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Role is required',
        },
        notNull: {
          msg: 'Role is required',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  })
  return User;
};
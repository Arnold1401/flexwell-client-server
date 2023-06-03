/* eslint-disable camelcase */
const { User, sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AuthController {
  static async registerCustomer(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const result = await sequelize.transaction(async (t) => {
        const response = await User.create(
          {
            username,
            email,
            password,
            role: 'Client',
          },
          { transaction: t },
        );

        return response;
      });

      res.status(201).json({
        message: `User with id ${result.id} created successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username) {
        throw { name: 'Username is required' };
      }

      if (!password) {
        throw { name: 'Password is required' };
      }

      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        throw { name: 'Invalid email/password' };
      }

      const isMatch = comparePassword(password, user.password);
      if (!isMatch) {
        throw { name: 'Invalid email/password' };
      }

      const access_token = generateToken({
        id: user.id,
        email: user.email,
        username,
      });

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

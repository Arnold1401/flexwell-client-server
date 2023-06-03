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
}

module.exports = AuthController;

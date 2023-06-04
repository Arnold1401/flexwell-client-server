/* eslint-disable camelcase */
const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const { id } = verifyToken(access_token);
    const user = await User.findByPk(id);

    if (!user) {
      throw { name: 'Invalid token' };
    }

    req.user = {
      id: user.id,
      role: user.role,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};

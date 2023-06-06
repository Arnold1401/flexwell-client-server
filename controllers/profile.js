/* eslint-disable no-param-reassign */
const { User } = require('../models');

class ProfileConstroller {
  static async getProfile(req, res, next) {
    try {
      const { id: userId } = req.user;

      const profile = await User.findOne({
        where: {
          id: userId,
        },
        attributes: ['id', 'fullName', 'gender', 'dateOfBirth'],
      });

      if (!profile) {
        throw { name: 'Data not found' };
      }

      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req, res, next) {
    try {
      const { id } = req.user;
      const { fullName, gender, dateOfBirth } = req.body;
      await User.update({ fullName, gender, dateOfBirth }, {
        where: {
          id,
        },
      });

      res.status(201).json({ message: `Profile with id ${id} created successfully` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileConstroller;

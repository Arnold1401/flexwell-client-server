/* eslint-disable no-param-reassign */
const { User, BodyProfile } = require('../models');

class ProfileConstroller {
  static async getProfile(req, res) {
    const { id: userId } = req.user;

    const profile = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ['id', 'fullName', 'gender', 'dateOfBirth'],
    });

    res.json(profile);
  }

  static async createProfile(req, res) {
    const { id } = req.user;
    const { fullName, gender, dateOfBirth } = req.body;
    await User.update({ fullName, gender, dateOfBirth }, {
      where: {
        id,
      },
    });

    res.status(201).json({ message: `Profile with id ${id} created successfully` });
  }

  static async getBodyProfiles(req, res) {
    const { id: userId } = req.user;

    const bodyProfiles = await BodyProfile.findAll({
      where: {
        userId,
      },
      attributes: {
        excludes: ['createdAt', 'updatedAt'],
      },
    });

    res.json(bodyProfiles);
  }

  static async createBodyProfile(req, res, next) {
    try {
      const { id: userId } = req.user;
      const {
        biceps = 0, waist = 0, chest = 0, shoulder = 0, thigh = 0, calf = 0, height = 0, weight = 0,
      } = req.body;
      const bodyProfile = await BodyProfile
        .create({
          biceps, waist, chest, shoulder, thigh, calf, height, weight, date: new Date(), userId,
        });

      res.status(201).json({ message: `Body profile with id ${bodyProfile.id} created successfully` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileConstroller;

/* istanbul ignore file */
const { BodyProfile, Profile } = require('../models');

class ProfilesTableTestHelper {
  static async addBodyProfile({
    biceps = 8,
    waist = 9,
    chest = 8,
    shoulder = 8,
    thigh = 10,
    calf = 10,
    height = 8,
    weight = 9,
    date = new Date(),
    userId = 1,
  }) {
    const result = await BodyProfile.create({
      biceps,
      waist,
      chest,
      shoulder,
      thigh,
      calf,
      height,
      weight,
      date,
      userId,
    });

    return result;
  }

  static cleanProfiles() {
    return Profile.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }

  static cleanBodyProfiles() {
    return BodyProfile.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = ProfilesTableTestHelper;

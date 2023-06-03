/* istanbul ignore file */
const { User } = require('../models');

class UsersTableTestHelper {
  static async addUser({
    username = 'john', password = 'secret', email = 'john@gmail.com', role = 'Client', gender = 'Male', fullName = 'john doe',
  }) {
    const result = await User.create({
      username, password, email, role, gender, fullName,
    });

    return {
      id: result.id,
      email: result.email,
      username: result.username,
      fullName: result.fullName,
      gender: result.gender,
      role: result.role,
    };
  }

  static findUsersById(id) {
    return User.findAll({
      where: {
        id,
      },
      attributes: {
        excludes: ['createdAt', 'updatedAt'],
      },
    });
  }

  static cleanTable() {
    return User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = UsersTableTestHelper;

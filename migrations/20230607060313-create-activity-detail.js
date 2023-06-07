/* eslint-disable */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActivityDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      totalSet: {
        type: Sequelize.INTEGER,
      },
      repetition: {
        type: Sequelize.INTEGER,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      status: Sequelize.STRING,
      weight: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      activityId: {
        type: Sequelize.INTEGER,
      },
      exerciseDetailId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ActivityDetails');
  },
};

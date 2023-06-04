/* istanbul ignore file */
/* eslint-disable */
'use strict';
const challengeDetails = require('../data/challengeDetails.json');
challengeDetails.forEach(challenge => {
  challenge.createdAt = challenge.updatedAt = new Date();
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExerciseDetails', challengeDetails, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExerciseDetails', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

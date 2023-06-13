'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: '0995086534ts@gmail.com',
      password: '123456',
      firstName: 'Admin',
      lastName: 'SQL',
      address: 'HCM',
      phonenumber: '0587928264',
      gender: 1,
      roleId: 'R1',
      positionId: 'P',
      image: 'asdfasdfasdfasdf',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

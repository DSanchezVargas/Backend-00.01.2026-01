'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const password = '123456';
    const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        lastName: 'Root',
        email: 'admin@test.com',
        passwordHash: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Juan',
        lastName: 'Instructor',
        email: 'instructor@test.com',
        passwordHash: hashedPassword,
        role: 'instructor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Ana',
        lastName: 'Student',
        email: 'student@test.com',
        passwordHash: hashedPassword,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

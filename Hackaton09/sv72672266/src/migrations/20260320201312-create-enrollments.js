'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Enrollments', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },

      courseId: {
        type: Sequelize.INTEGER,
        references: { model: 'Courses', key: 'id' },
        onDelete: 'CASCADE'
      },

      status: {
        type: Sequelize.ENUM('active', 'pending'),
        defaultValue: 'pending'
      },

      score: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true
      },

      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // Evita duplicados user-course
    await queryInterface.addConstraint('Enrollments', {
      fields: ['userId', 'courseId'],
      type: 'unique',
      name: 'unique_user_course'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Enrollments');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Lessons', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

      title: Sequelize.STRING,
      slug: Sequelize.STRING,
      body: Sequelize.TEXT,
      order: Sequelize.INTEGER,

      courseId: {
        type: Sequelize.INTEGER,
        references: { model: 'Courses', key: 'id' },
        onDelete: 'CASCADE'
      },

      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      deletedAt: { type: Sequelize.DATE }
    });

    // Evita duplicados de slug por curso
    await queryInterface.addConstraint('Lessons', {
      fields: ['slug', 'courseId'],
      type: 'unique',
      name: 'unique_lesson_slug_per_course'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Lessons');
  }
};

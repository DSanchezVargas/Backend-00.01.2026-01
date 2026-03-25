'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

      title: { type: Sequelize.STRING, unique: true },
      slug: { type: Sequelize.STRING, unique: true },

      description: Sequelize.TEXT,
      published: { type: Sequelize.BOOLEAN, defaultValue: false },

      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

      deletedAt: { type: Sequelize.DATE } // paranoid
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};

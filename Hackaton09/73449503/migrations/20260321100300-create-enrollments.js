'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enrollments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: Sequelize.ENUM('active', 'pending'),
        allowNull: false,
        defaultValue: 'pending'
      },
      score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    await queryInterface.addIndex('enrollments', ['userId', 'courseId'], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('enrollments');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_enrollments_status";');
  }
};

'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@dev.io',
        passwordHash: 'x',
        role: 'instructor',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        firstName: 'Linus',
        lastName: 'Torvalds',
        email: 'linus@dev.io',
        passwordHash: 'y',
        role: 'student',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        firstName: 'Grace',
        lastName: 'Hopper',
        email: 'grace@dev.io',
        passwordHash: 'z',
        role: 'student',
        createdAt: now,
        updatedAt: now
      }
    ]);

    await queryInterface.bulkInsert('courses', [
      {
        id: 1,
        title: 'Intro a Node',
        slug: 'intro-a-node',
        description: 'Curso base de Node y APIs REST.',
        published: true,
        studentsCount: 0,
        ownerId: 1,
        createdAt: now,
        updatedAt: now
      }
    ]);

    await queryInterface.bulkInsert('lessons', [
      {
        id: 1,
        title: 'Setup',
        slug: 'setup',
        body: 'Instalacion y herramientas basicas para comenzar el curso.',
        order: 1,
        courseId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        title: 'HTTP',
        slug: 'http',
        body: 'Conceptos clave de HTTP y estructura de una API REST.',
        order: 2,
        courseId: 1,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('lessons', null, {});
    await queryInterface.bulkDelete('courses', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};

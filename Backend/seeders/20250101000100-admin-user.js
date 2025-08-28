'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'BRM123', 10);
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@brm.com',
      passwordHash,
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: process.env.ADMIN_EMAIL || 'admin@brm.com' }, {});
  }
};

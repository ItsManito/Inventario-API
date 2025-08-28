'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      { 
        lotNumber: 'L-001', 
        name: 'Teclado', 
        price: 210.00, 
        quantityAvailable: 50, 
        entryDate: '2025-08-27', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        lotNumber: 'L-002', 
        name: 'Mouse', 
        price: 70.50, 
        quantityAvailable: 80, 
        entryDate: '2025-08-27', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        lotNumber: 'L-003', 
        name: 'Monitor', 
        price: 150.00, 
        quantityAvailable: 20, 
        entryDate: '2025-08-27', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ]
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

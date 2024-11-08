'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add columns to Users table
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: true,  // Allow null for existing data
    });
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,  // Allow null for existing data
    });

    // Add columns to Waitlists table
    await queryInterface.addColumn('Waitlists', 'address', {
      type: Sequelize.STRING,
      allowNull: true,  // Allow null for existing data
    });
    await queryInterface.addColumn('Waitlists', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,  // Allow null for existing data
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns in case of rollback
    await queryInterface.removeColumn('Users', 'email');
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Waitlists', 'address');
    await queryInterface.removeColumn('Waitlists', 'phone');
  }
};

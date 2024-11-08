'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'salt', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'salt');
  }
};

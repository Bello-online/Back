'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('WaitlistCustomers', {
      fields: ['waitlistId'],
      type: 'foreign key',
      name: 'fk_waitlistcustomers_waitlistid', // custom constraint name
      references: {
        table: 'Waitlists',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('WaitlistCustomers', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_waitlistcustomers_userid', // custom constraint name
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('WaitlistCustomers', 'fk_waitlistcustomers_waitlistid');
    await queryInterface.removeConstraint('WaitlistCustomers', 'fk_waitlistcustomers_userid');
  },
};

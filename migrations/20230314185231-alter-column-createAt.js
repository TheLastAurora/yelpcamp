'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('content', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('content', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.changeColumn('content', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('content', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};

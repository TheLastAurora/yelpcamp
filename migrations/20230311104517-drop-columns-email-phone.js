'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('campground', 'email');
    await queryInterface.removeColumn('campground', 'phone');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('campground', 'email', { type: DataTypes.STRING });
    await queryInterface.addColumn('campground', 'phone', { type: DataTypes.STRING });
  }
};

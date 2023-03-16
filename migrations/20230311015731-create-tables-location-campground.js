'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('location', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      latitude: DataTypes.DECIMAL(10, 8),
      longitude: DataTypes.DECIMAL(10, 8),
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip_code: DataTypes.INTEGER,
      country: DataTypes.STRING,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    }, { underscored: true });

    await queryInterface.createTable('campground', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING,
      location_fk: {
        type: DataTypes.INTEGER,
        references: {
          model: 'location',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_fk: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rating: DataTypes.DECIMAL,
      capacity: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      rules: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    }, { underscored: true })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('location');
    await queryInterface.dropTable('campground');
  }
};
